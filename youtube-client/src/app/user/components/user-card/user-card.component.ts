import { Component, Input, OnInit } from '@angular/core';

import { UserCard } from '../../models/user-card';

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

  constructor() { }

  ngOnInit(): void {
    console.log('UserCardComponent');
  }

}
