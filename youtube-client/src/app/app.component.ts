import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  filteredTitle = '';

  filter(title: string) {
    this.filteredTitle = title;
  }
}
