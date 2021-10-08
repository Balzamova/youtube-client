import { Pipe, PipeTransform } from '@angular/core';
import { UserCard } from '@youtube/models/user-card';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipe implements PipeTransform {

  transform(cards: UserCard[], title: string): UserCard[] {
    if (!cards || !title) return cards;

    return cards.filter(card => {
      return this.isTitleIncludes(card, title);
    });
  }

  isTitleIncludes(card: UserCard, title:string): boolean {
    const cardTitle = card.title.split(' ');

    return cardTitle.some(el => {
      return el.substr(0, title.length).toLowerCase() === title.toLowerCase();
    });
  }
}
