import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { sortBy } from '@app/core/components/header/components/filters-block/models/sort-by';
import { youtubeMockResponse } from '@app/youtube/services/youtube-response';
import { YoutubeResponse } from '@shared/models/youtube-response';
import { UserCard } from '@youtube/models/user-card';
import { YoutubeService } from '@youtube/services/youtube.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnChanges {
  @Input() filteredTitle = '';
  @Input() searchedTitle = '';
  @Input() sortBy = '';

  cards: UserCard[] = [];

  youtubeResponse?: YoutubeResponse;

  constructor(private youtubeService: YoutubeService, private router: ActivatedRoute) {}

  ngOnChanges(): void {
    console.log(this.filteredTitle)
  }

  ngOnInit() {
    this.youtubeResponse = youtubeMockResponse;
    // this.cards = this.getCardsByTitle();

    this.cards = this.getMockCards();
    this.sort();
  }

  getMockCards(): UserCard[] {
    if (this.youtubeResponse) {
      return this.youtubeResponse.items.map(card => {
        return {
          id: card.id,
          title: card.snippet?.title,
          publishedAt: card.snippet.publishedAt,
          imageUrl: card.snippet.thumbnails.medium.url,
          viewCount: card.statistics.viewCount,
          likeCount: card.statistics.likeCount,
          dislikeCount: card.statistics.dislikeCount,
          commentCount: card.statistics.commentCount,
        }
      });
    }
    return [];
  }

  sort() {
    if (this.sortBy === sortBy.dateAsc
      || this.sortBy === sortBy.dateDesc) {
      this.cards = this.youtubeService.sortByDate(this.cards);
    }
    if (this.sortBy === sortBy.viewsAsc
      || this.sortBy === sortBy.viewsDesc) {
      this.cards = this.youtubeService.sortByViews(this.cards);
    }
  }

  getCardsByTitle() {
    const items = this.youtubeResponse?.items;
    const cards = [];

    if (!items?.length) return [];

    for (let i = 0; i < items.length; i++) {
      const needShow = this.checkTitles(items[i].snippet.title);
      if (needShow) {
        const card = this.youtubeService.getCard(items[i]);
        cards.push(card);
      }
    }

    return cards;
  }

  checkTitles(title: string): boolean {
    const array = title.toLowerCase().split(' ');
    const toShow = this.searchedTitle.toLowerCase().trim();

    return array.some(el => {
      return el.substr(0, toShow.length) === toShow;
    });
  }
}
