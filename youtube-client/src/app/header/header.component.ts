import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  toggle = true;
  @Output() public filterByTitle: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { console.log('header'); }

  toggleFilters() {
    this.toggle = !this.toggle;
  }

  filter(title: string) {
    this.filterByTitle.emit(title);
  }
}
