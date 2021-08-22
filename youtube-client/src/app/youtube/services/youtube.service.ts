import { EventEmitter, Injectable } from '@angular/core';
import { BaseYoutubeResponse } from '@app/shared/models/base-youtube-response';
import { FullYoutubeResponse } from '@app/shared/models/full-youtube-response';
import { KindYoutubeVideo } from '@app/shared/models/kind-youtube-video';
import { SearchYoutubeKind } from '@app/shared/models/search-youtube-kind';
import { SortingDirection } from '@app/shared/models/sorting-direction';
import { ConfigService } from '@app/shared/services/config.service';
import { SharedService } from '@app/shared/services/shared.service';
import { BorderColor } from '@app/youtube/models/card-border-color';
import { DaysGone } from '@app/youtube/models/card-days-passed';

import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { UserCard } from '../models/user-card';
import { UserDetailsCard } from '../models/user-details-card';
import { CardsHttpService } from './cards-http.service';

@Injectable()
export class YoutubeService {
  private youtubeResponse$: Observable<BaseYoutubeResponse>;

  private youtubeResponse$$ = new Subject<BaseYoutubeResponse>();

  private statisticsResponse$: Observable<FullYoutubeResponse>;

  private statisticsResponse$$ = new BehaviorSubject<FullYoutubeResponse>({
    kind: '',
    etag: '',
    pageInfo: {
      totalResults: 0,
      resultsPerPage: 0
    },
    items: []
  });

  public cards$: Observable<UserCard[]>;

  private cards$$ = new Subject<UserCard[]>();

  public cardsList$ = new EventEmitter<UserCard[]>();

  public cards: UserCard[] = [];

  constructor(
    private cardsHttp: CardsHttpService,
  ) {
    this.youtubeResponse$ = this.youtubeResponse$$.asObservable();
    this.statisticsResponse$ = this.statisticsResponse$$.asObservable();
    this.cards$ = this.cards$$.asObservable();
  }

  initData(searchedTitle: string) {
    this.cardsHttp.getCards(searchedTitle)
      .subscribe((resp) => {
        console.log(resp.items);
        if (resp.items) {
          this.getStatisticsData(resp.items);
        }
    });
  }

  getStatisticsData(items: SearchYoutubeKind[]) {
    this.cardsHttp.getStatistics(this.getCardsId(items))
      .subscribe((resp) => {
        this.statisticsResponse$$.next(resp);
      });
  }

  getCardsId(items: SearchYoutubeKind[]) {
    return items.map(item => {
      return item.id.videoId;
    });
  }

  getCards(items: KindYoutubeVideo[]) {
    const cards: UserCard[] = [];

    for (let i = 0; i < items.length; i++) {
      const card = this.getCard(items[i]);
      cards.push(card);
    }

    this.cards = cards;
    return cards;
  }

  getCardsByTitle(searchedTitle: UserCard['title']) {
    this.initData(searchedTitle);

    if (this.statisticsResponse$$) {
      const items = this.statisticsResponse$$.value.items;
      if (!items) return [];

      return this.getCards(items);
    }
    return [];
  }

  getCard(card: KindYoutubeVideo): UserCard {
    return {
      id: card.id,
      title: card.snippet.title,
      publishedAt: card.snippet.publishedAt,
      imageUrl: card.snippet.thumbnails.medium.url,
      viewCount: card.statistics.viewCount,
      likeCount: card.statistics.likeCount,
      dislikeCount: card.statistics.dislikeCount,
      commentCount: card.statistics.commentCount,
    };
  }

  getCardById(id: UserCard['id']): UserDetailsCard | undefined {
    const list = this.statisticsResponse$$.value.items;
    const element = list.find(item => item.id === id);

    if (element) return this.getCardFromElem(element);
    return;
  }

  getCardFromElem(element: KindYoutubeVideo): UserDetailsCard {
    const { id, statistics, snippet } = element;
    const { thumbnails } = snippet;
    const { standard } = thumbnails;

    return {
      id: id,
      title: snippet.title,
      publishedAt: snippet.publishedAt,
      imageUrl: standard.url,
      viewCount: statistics.viewCount,
      likeCount: statistics.likeCount,
      dislikeCount: statistics.dislikeCount,
      commentCount: statistics.commentCount,
      description: snippet.description,
    };
  }

  sort(cards: UserCard[], param: string): UserCard[] {
    if (param === SortingDirection.dateAsc || param === SortingDirection.dateDesc) {
      return this.sortByDate(cards, param);
    }

    if (param === SortingDirection.viewsAsc || param === SortingDirection.viewsDesc) {
      return this.sortByViews(cards, param);
    }

    return [];
  }

  sortByViews(cards: UserCard[], sort: string): UserCard[] {
    let state = true;

    sort === SortingDirection.viewsAsc ? (state = false) : (state = true);

    cards.sort((a, b) => {
      const c = +a.viewCount;
      const d = +b.viewCount;

      if (state) return c - d;
      return d - c;
    });

    return cards;
  }

  sortByDate(cards: UserCard[], sort: string): UserCard[] {
    let state = true;

    sort === SortingDirection.dateAsc ? (state = false) : (state = true);

    cards.sort((a, b) => {
      const c = this.getPassedDays(a);
      const d = this.getPassedDays(b);

      if (state) return c - d;
      return d - c;
    });

    return cards;
  }

  getPassedDays(card: UserCard): number {
    const date: Date = new Date(card.publishedAt);
    const currentDate = Date.now();
    const daysGone = Math.ceil(
      Math.abs(currentDate - date.getTime()) / (1000 * 3600 * 24),
    );

    return daysGone;
  }

  checkBorderColor(card: UserCard): string {
    let color = '';
    const passedDays: number = this.checkPassedDays(card);

    switch (true) {
      case passedDays === DaysGone.week:
        color = BorderColor.blue;
        break;
      case passedDays === DaysGone.month:
        color = BorderColor.green;
        break;
      case passedDays === DaysGone.sixMonth:
        color = BorderColor.yellow;
        break;
      default:
        color = BorderColor.red;
    }

    return color;
  }

  checkPassedDays(card: UserCard): number {
    const daysGone = this.getPassedDays(card);

    if (daysGone >= DaysGone.moreSixMonth) {
      return DaysGone.moreSixMonth;
    }

    if (daysGone > DaysGone.month) {
      return DaysGone.sixMonth;
    }

    if (daysGone > DaysGone.week) {
      return DaysGone.month;
    }

    return DaysGone.week;
  }
}
