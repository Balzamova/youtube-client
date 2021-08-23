import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-block',
  templateUrl: './search-block.component.html',
  styleUrls: ['./search-block.component.scss']
})
export class SearchBlockComponent {
  @Output() public searchValue: EventEmitter<string> = new EventEmitter();

  constructor() {}

  search(value: string) {
    this.searchValue.emit(value);
  }
}
