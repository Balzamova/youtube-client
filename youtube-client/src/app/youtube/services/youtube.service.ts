import { Injectable } from '@angular/core';
import { sortBy } from '@app/core/components/header/components/filters-block/models/sort-by';
import { KindYoutubeVideo } from '@app/shared/models/kind-youtube-video';
import { BorderColor } from '@app/youtube/models/card-border-color';
import { DaysGone } from '@app/youtube/models/card-days-passed';

import { Month } from '../models/month';
import { UserCard } from '../models/user-card';
import { UserDetailsCard } from '../models/user-details-card';
import { youtubeMockResponse } from './youtube-response';

@Injectable()
export class YoutubeService {

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

  convertDateFormat(date: string): string {
    const published = date.split('T')[0].split('-');
    const month = Month[+published[1] - 1];

    return `${month} ${published[2]}, ${published[0]}`;
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
      const c = this.getPublishDate(a);
      const d = this.getPublishDate(b);

      if (state) return c - d;
      return d - c;
    });

    return cards;
  }

  getPublishDate(card: UserCard): number {
    const published = card.publishedAt.split('T')[0];
    const currentDate = published.split('-').reverse();
    const start = [0, 0, 1970];
    const passedDays: number[] = [];

    for (let i = 0; i < currentDate.length; i++) {
      passedDays.push(+currentDate[i] - start[i])
    }

    return this.getPassedDays(passedDays);
  }

  getPassedDays(array: number[]): number {
    const daysInMonth = 30;
    const daysInYear = 365;
    return array[0] + array[1] * daysInMonth + array[2] * daysInYear;
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
    const date: Date = new Date(card.publishedAt);
    const currentDate = Date.now();
    const daysGone = Math.ceil(Math.abs(currentDate - date.getTime()) / (1000 * 3600 * 24));

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
