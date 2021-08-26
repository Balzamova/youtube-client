import { Component, OnInit } from '@angular/core';
import { SharedService } from '@app/shared/services/shared.service';
import { youtubeMockResponse } from '@app/youtube/services/youtube-response';
import { UserCard } from '@youtube/models/user-card';
import { YoutubeService } from '@youtube/services/youtube.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  filteredTitle = '';

  cards: UserCard[] = [];

  constructor(
    private youtubeService: YoutubeService,
    private sharedService: SharedService,
  ) {}

  ngOnInit() {
    this.youtubeService.youtubeResponse = youtubeMockResponse;

    this.subscribeInput();
    this.subscribeSorting();
    this.subscribeFilters();
  }

  subscribeInput() {
    this.sharedService.searchInputValue$.subscribe((value) => {
      if (!value) return;

      this.cards = [...this.youtubeService.getCardsByTitle(value)];
    });
  }

  subscribeSorting() {
    this.sharedService.onSort$.subscribe((value) => {
      this.cards = this.youtubeService.sort(this.cards, value);
    });
  }

  subscribeFilters() {
    this.sharedService.onFilter$.subscribe((title) => {
      this.filteredTitle = title;
    });
  }
}
