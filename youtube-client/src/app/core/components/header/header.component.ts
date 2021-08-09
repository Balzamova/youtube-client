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
  @Output() public sortBy: EventEmitter<string> = new EventEmitter();

  constructor() { }

  filter(title: string) {
    this.filterByTitle.emit(title);
  }

  search(value: string) {
    this.searchValue.emit(value);
  }

  handleToggle() {
    this.toggle = !this.toggle;
  }

  sort(value: string) {
    this.sortBy.emit(value);
  }
}