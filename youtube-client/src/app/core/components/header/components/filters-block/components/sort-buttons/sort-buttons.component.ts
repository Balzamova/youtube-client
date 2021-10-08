import { Component, EventEmitter, Output } from '@angular/core';
import { SharedService } from '@app/shared/services/shared.service';

import { SortingDirection } from '../../../../../../../shared/models/sorting-direction';

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
    this.dateState ? this.sort(SortingDirection.dateAsc) : this.sort(SortingDirection.dateDesc)
  }

  sortByViews() {
    this.viewsState = !this.viewsState;
    this.viewsState ? this.sort(SortingDirection.viewsAsc) : this.sort(SortingDirection.viewsDesc)
  }
}
