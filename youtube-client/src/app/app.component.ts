import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  filteredTitle = '';

  searchedTitle = '';

  searchClicked = false;

  filter(title: string) {
    this.filteredTitle = title;
  }

  search(title: string) {
    this.searchedTitle = title;
    title ? this.searchClicked = true : this.searchClicked = false;
  }
}
