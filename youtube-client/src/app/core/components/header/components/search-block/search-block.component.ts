import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '@app/shared/services/shared.service';

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
