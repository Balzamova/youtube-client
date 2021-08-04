import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  toggle = false;
  @Output() public filterByTitle: EventEmitter<string> = new EventEmitter();
  @Output() public searchValue: EventEmitter<string> = new EventEmitter();

  constructor() { }

  toggleFilters() {
    this.toggle = !this.toggle;
  }

  filter(title: string) {
    this.filterByTitle.emit(title);
  }

  search(value: string) {
    this.searchValue.emit(value);
  }
}
