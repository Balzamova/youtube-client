import { Injectable } from '@angular/core';
import { sortBy } from '@app/core/components/header/components/filters-block/models/sort-by';
import { KindYoutubeVideo } from '@app/shared/models/kind-youtube-video';
import { YoutubeResponse } from '@app/shared/models/youtube-response';
import { BorderColor } from '@app/youtube/models/card-border-color';
import { DaysGone } from '@app/youtube/models/card-days-passed';

import { UserCard } from '../models/user-card';
import { UserDetailsCard } from '../models/user-details-card';
import { youtubeMockResponse } from './youtube-response';

@Injectable()
export class YoutubeService {
  youtubeResponse?: YoutubeResponse;

  getCardsByTitle(searchedTitle: string) {
    const items = this.youtubeResponse?.items;
    const cards = [];

    if (!items?.length) return [];

    for (let i = 0; i < items.length; i++) {
      const needShow = this.checkTitles(items[i].snippet.title, searchedTitle);
      if (needShow) {
        const card = this.getCard(items[i]);
        cards.push(card);
      }
    }

    return cards;
  }

  checkTitles(title: string, searchedTitle: string): boolean {
    const array = title.toLowerCase().split(' ');
    const toShow = searchedTitle.toLowerCase().trim();

    if (!toShow.length) return false;

    return array.some(el => {
      return el.substr(0, toShow.length) === toShow;
    });
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
    }
  }

  getCardById(id: string): UserDetailsCard | undefined {
    const list = youtubeMockResponse?.items;
    const element = list.find(item => item.id === id);

    if (element) return this.getCardFromElem(element);
    return;
  }

  getCardFromElem(element: KindYoutubeVideo): UserDetailsCard {
    const { id, statistics, snippet } = element;
    const { thumbnails} = snippet;
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
      description: snippet.description
    };
  }

  sort(cards: UserCard[], param: string): UserCard[] {
    if (param === sortBy.dateAsc
      || param === sortBy.dateDesc) {
      return this.sortByDate(cards, param);
    }

    if (param === sortBy.viewsAsc
      || param === sortBy.viewsDesc) {
      return this.sortByViews(cards, param);
    }

    return [];
  }

  sortByViews(cards: UserCard[], sort: string): UserCard[] {
    let state = true;

    sort === sortBy.viewsAsc ? state = false : state = true;

    cards.sort((a,b) => {
      const c = +a.viewCount;
      const d = +b.viewCount;

      if (state) return c - d;
      return d - c;
    });

    return cards;
  }

  sortByDate(cards: UserCard[], sort: string): UserCard[] {
    let state = true;

    sort === sortBy.dateAsc ? state = false : state = true;

    cards.sort((a,b) => {
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
    const daysGone = Math.ceil(Math.abs(currentDate - date.getTime()) / (1000 * 3600 * 24));

    return daysGone;
  }

  checkBorderColor(card: UserCard): string {
    let color = '';
    const passedDays: number = this.checkPassedDays(card);

    switch(true) {
      case (passedDays === DaysGone.week) :
        color = BorderColor.blue;
      break;
      case (passedDays === DaysGone.month) :
        color = BorderColor.green;
      break;
      case (passedDays === DaysGone.sixMonth) :
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
