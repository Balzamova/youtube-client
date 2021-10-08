import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '@app/shared/services/shared.service';

import { fromEvent, of } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-block',
  templateUrl: './search-block.component.html',
  styleUrls: ['./search-block.component.scss']
})
export class SearchBlockComponent {

  constructor(
    private router: Router,
    private sharedService: SharedService) {}

  search(value: string) {
    if (!value || value.length < 3) return;

    this.router.navigate([`main/${value}`]);
    this.sharedService.searchInputValue = value;
    this.sharedService.searchInputValue$.emit(value);
  }
}
