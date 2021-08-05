import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filters-block',
  templateUrl: './filters-block.component.html',
  styleUrls: ['./filters-block.component.scss']
})
export class FiltersBlockComponent {
  title = '';

  @Output() public filterByTitle: EventEmitter<string> = new EventEmitter();

  constructor() { }

  filter(title: string) {
    this.filterByTitle.emit(title);
  }
}
