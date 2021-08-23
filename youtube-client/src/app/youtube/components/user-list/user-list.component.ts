import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { sortBy } from '@app/core/components/header/components/filters-block/models/sort-by';
import { YoutubeResponse } from '@shared/models/youtube-response';
import { UserCard } from '@youtube/models/user-card';
import { YoutubeService } from '@youtube/services/youtube.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnChanges {
  @Input() filteredTitle = '';
  @Input() searchedTitle = '';
  @Input() sortBy = '';

  cards: UserCard[] = [];

  youtubeResponse?: YoutubeResponse;

  constructor(private youtubeService: YoutubeService) {}

  ngOnChanges() {
    this.youtubeResponse = this.youtubeService.youtubeResponse;
    this.cards = this.getCardsByTitle();
    this.sort();
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
