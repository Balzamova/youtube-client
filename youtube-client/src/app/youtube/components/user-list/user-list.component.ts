import { Component, OnInit } from '@angular/core';
import { sortBy } from '@app/core/components/header/components/filters-block/models/sort-by';
import { SharedService } from '@app/shared/services/shared.service';
import { youtubeMockResponse } from '@app/youtube/services/youtube-response';
import { YoutubeResponse } from '@shared/models/youtube-response';
import { UserCard } from '@youtube/models/user-card';
import { YoutubeService } from '@youtube/services/youtube.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  filteredTitle = '';

  sortBy = '';

  searchedTitle = '';

  cards: UserCard[] = [];

  youtubeResponse?: YoutubeResponse;

  constructor(
    private youtubeService: YoutubeService,
    private sharedService: SharedService,
  ) {}

  ngOnInit() {
    this.youtubeResponse = youtubeMockResponse;

    this.searchedTitle = this.sharedService.searchInputValue;
    this.cards = this.getCardsByTitle();

    this.sharedService.onSort$.subscribe((value) => {
      this.sortBy = value;
      this.sort();
    });

    this.sharedService.onFilter$.subscribe((title) => {
      this.filteredTitle = title;
    });
  }

  sort() {
    if (this.sortBy === sortBy.dateAsc
      || this.sortBy === sortBy.dateDesc) {
      this.cards = this.youtubeService.sortByDate(this.cards, this.sortBy);
    }
    if (this.sortBy === sortBy.viewsAsc
      || this.sortBy === sortBy.viewsDesc) {
      this.cards = this.youtubeService.sortByViews(this.cards, this.sortBy);
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

    if (!toShow.length) return false;

    return array.some(el => {
      return el.substr(0, toShow.length) === toShow;
    });
  }
}
