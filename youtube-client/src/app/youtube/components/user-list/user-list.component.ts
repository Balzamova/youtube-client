import { Component, OnInit } from '@angular/core';
import { SharedService } from '@app/shared/services/shared.service';
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
    public youtubeService: YoutubeService,
    private sharedService: SharedService,
  ) {}

  ngOnInit() {
    this.subscribeInput();
    this.subscribeSorting();
    this.subscribeFilters();
    this.subscribeDetailsCard();
  }

  subscribeInput() {
    this.sharedService.searchInputValue$.subscribe((value) => {
      this.youtubeService.initData(value).subscribe(
        (resp) => {
          if (!resp) return;
          this.youtubeService.getStatisticsData(resp.items).subscribe((resp) => {
            this.cards = this.youtubeService.getCards(resp.items);
          });
        }
      );
    });
  }

  subscribeDetailsCard() {
    this.youtubeService.cardsList$.subscribe(() => {
      this.cards = [...this.youtubeService.cards];
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
