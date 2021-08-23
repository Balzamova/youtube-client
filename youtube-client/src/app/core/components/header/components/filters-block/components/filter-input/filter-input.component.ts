import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss']
})
export class FilterInputComponent {
  @Output() public filterByTitle: EventEmitter<string> = new EventEmitter();

  constructor() { }

  filter(title: string) {
    this.filterByTitle.emit(title);
  }
}
