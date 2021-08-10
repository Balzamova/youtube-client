import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-block',
  templateUrl: './search-block.component.html',
  styleUrls: ['./search-block.component.scss']
})
export class SearchBlockComponent {
  @Output() public searchValue: EventEmitter<string> = new EventEmitter();

  constructor(private router: Router) {}

  search(value: string) {
    this.searchValue.emit(value);
    this.router.navigate(['/main/cards']);
  }
}
