import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-block',
  templateUrl: './search-block.component.html',
  styleUrls: ['./search-block.component.scss']
})
export class SearchBlockComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /*
  Попробуйте завести в общем родителе флаг,
  который изменяется при клике поиска,
  а в компоненте результат слушал изменения
  данного флага
  */

}
