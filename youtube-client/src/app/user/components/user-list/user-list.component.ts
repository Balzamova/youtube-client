import { Component, OnInit } from '@angular/core';

import { youtubeResponse } from 'src/app/shared/constants/youtube.response';

import { UserCard } from '../../models/user-card';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  cards: UserCard[] = youtubeResponse.items.map(card => {
    return {
      id: card.id,
      title: card.snippet?.title,
      publishedAt: card.snippet.publishedAt,
      imageUrl: card.snippet.thumbnails.medium.url,
      viewCount: card.statistics.viewCount,
      likeCount: card.statistics.likeCount,
      dislikeCount: card.statistics.dislikeCount,
      commentCount: card.statistics.commentCount,
    }
  });

  constructor() { }

  ngOnInit(): void {}
}
