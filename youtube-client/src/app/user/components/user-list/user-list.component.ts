import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { youtubeResponse } from 'src/app/shared/constants/youtube.response';
import { KindYoutubeVideo } from 'src/app/shared/models/kind-youtube-video';

import { UserCard } from '../../models/user-card';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnChanges {
  @Input() filteredTitle = '';
  @Input() searchedTitle = '';

  cards: UserCard[] = [];

  constructor() {}

  ngOnChanges() {
    this.cards = this.getCardsByTitle();
  }

  getCardsByTitle() {
    const items = youtubeResponse.items;
    const cards = [];

    for (let i = 0; i < items.length; i++) {
      const needShow = this.checkTitles(items[i].snippet.title);
      if (needShow) {
        const card = this.getCard(items[i]);
        cards.push(card);
      }
    }

    return cards;
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

  checkTitles(title: string): boolean {
    const array = title.toLowerCase().split(' ');
    const toShow = this.searchedTitle.toLowerCase().trim();

    return array.some(el => {
      return el.substr(0, toShow.length) === toShow;
    });
  }
}
