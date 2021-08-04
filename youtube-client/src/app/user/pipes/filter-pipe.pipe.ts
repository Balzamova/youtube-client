import { Pipe, PipeTransform } from '@angular/core';

import { UserCard } from '../models/user-card';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(cards: UserCard[], title: string): UserCard[] {
    if (!cards || !title) return cards;

    return cards.filter(card => {
      return card.title.substr(0, title.length).toLowerCase() === title.toLowerCase();
    });
  }
}
