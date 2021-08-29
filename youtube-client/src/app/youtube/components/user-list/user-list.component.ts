import { Component, OnInit } from '@angular/core';
import { SharedService } from '@app/shared/services/shared.service';
import { AppState, State } from '@app/store/state';
import { createFeatureSelector, Store } from '@ngrx/store';
import { UserCard } from '@youtube/models/user-card';
import { YoutubeService } from '@youtube/services/youtube.service';

import { Observable } from 'rxjs';

import * as CardsActions from '../../store/actions';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  filteredTitle = '';

  cards: UserCard[] = [];

  constructor(
    private store: Store<AppState>,
    public youtubeService: YoutubeService,
    private sharedService: SharedService,
  ) { }

  ngOnInit() {
    console.log(State.cardState.cards);

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
            this.store.dispatch(CardsActions.updateState({ cards: this.cards }));
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
