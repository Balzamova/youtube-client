import { Component } from '@angular/core';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'app-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss']
})
export class FilterInputComponent {
  constructor(private sharedService: SharedService) { }

  filter(title: string) {
    this.sharedService.onFilter$.emit(title)
  }
}
