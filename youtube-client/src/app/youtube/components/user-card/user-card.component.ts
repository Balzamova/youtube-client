import { Component, Input, OnInit } from '@angular/core';
import { BorderColor } from '@shared/models/card-border-color';
import { DaysGone } from '@shared/models/card-days-passed';
import { UserCard } from '@youtube/models/user-card';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() card: UserCard = {
    id: '',
    title: '',
    publishedAt: '',
    imageUrl: '',
    viewCount: '',
    likeCount: '',
    dislikeCount: '',
    commentCount: '',
  };

  border = '';

  constructor() { }

  ngOnInit(): void {
    this.border = this.checkBorderColor();
  }

  checkBorderColor(): string {
    let color = '';
    const passedDays: number = this.checkPassedDays();

    switch(true) {
      case (passedDays === DaysGone.week) :
        color = BorderColor.blue;
      break;
      case (passedDays === DaysGone.month) :
        color = BorderColor.green;
      break;
      case (passedDays === DaysGone.sixMonth) :
        color = BorderColor.yellow;
      break;
      default:
        color = BorderColor.red;
    }

    return color;
  }

  checkPassedDays(): number {
    let daysGone = 0;
    const publishedDate = this.card.publishedAt.split('T')[0];
    const currentDate = new Date();

    const publishedYear = +publishedDate.split('-')[0];
    const publishedMonth = +publishedDate.split('-')[1];
    const publishedDay = +publishedDate.split('-')[2];

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    if (currentYear - publishedYear !== 0) {
      return daysGone = DaysGone.moreMonth;
    }

    if (currentMonth - publishedMonth >= 6) {
      return daysGone = DaysGone.moreMonth;
    }

    if (currentMonth - publishedMonth < 6
      && currentMonth - publishedMonth > 1) {
      return daysGone = DaysGone.sixMonth;
    }

    if (currentDay - publishedDay > DaysGone.week) {
      return daysGone = DaysGone.month;
    }

    if (currentDay - publishedDay < DaysGone.week
      && currentDay - publishedDay > 0) {
      return daysGone = DaysGone.week;
    }

    if (currentDay - publishedDay < 0) {
      const monthLength = 30;
      const days = (monthLength - publishedDay) + currentDay;

      if (days < DaysGone.week) {
        return daysGone = DaysGone.week;
      } else {
        return daysGone = DaysGone.month;
      }
    }

    return daysGone;
  }
}
