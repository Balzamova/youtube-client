import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  toggle = false;

  @Output() public toggleFilterEvent: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  toggleFilters() {
    this.toggle = !this.toggle;
    this.toggleFilterEvent.emit(this.toggle);
  }
}
