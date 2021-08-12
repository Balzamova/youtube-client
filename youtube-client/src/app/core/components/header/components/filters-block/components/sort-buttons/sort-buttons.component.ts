import { Component, EventEmitter, Output } from '@angular/core';
import { SharedService } from '@app/shared/services/shared.service';

import { sortBy } from '../../models/sort-by';

@Component({
  selector: 'app-sort-buttons',
  templateUrl: './sort-buttons.component.html',
  styleUrls: ['./sort-buttons.component.scss']
})
export class SortButtonsComponent {
  viewsState = false;

  dateState = false;

  constructor(private sharedService: SharedService) {}

  sort(value: string) {
    this.sharedService.onSort$.emit(value);
  }

  sortByDate() {
    this.dateState = !this.dateState;
    let date;

    if (this.dateState) {
      date = sortBy.dateAsc;
    } else {
      date = sortBy.dateDesc;
    }

    this.sort(date);
  }

  sortByViews() {
    this.viewsState = !this.viewsState;
    let views;

    if (this.viewsState) {
      views = sortBy.viewsAsc;
    } else {
      views = sortBy.viewsDesc;
    }

    this.sort(views);
  }
}
