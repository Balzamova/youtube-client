import { Component, EventEmitter, Output } from '@angular/core';

import { sortBy } from '../../models/sort-by';

@Component({
  selector: 'app-sort-buttons',
  templateUrl: './sort-buttons.component.html',
  styleUrls: ['./sort-buttons.component.scss']
})
export class SortButtonsComponent {
  @Output() public sortBy: EventEmitter<string> = new EventEmitter();

  state = false;

  constructor() {}

  sort(value: string) {
    this.sortBy.emit(value);
  }

  sortByDate() {
    this.state = !this.state;
    let date;

    if (this.state) {
      date = sortBy.dateAsc;
    } else {
      date = sortBy.dateDesc;
    }

    this.sort(date);
  }

  sortByViews() {
    this.state = !this.state;
    let views;

    if (this.state) {
      views = sortBy.viewsAsc;
    } else {
      views = sortBy.viewsDesc;
    }

    this.sort(views);
  }
}
