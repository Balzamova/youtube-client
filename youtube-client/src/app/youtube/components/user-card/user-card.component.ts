import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { YoutubeService } from '@app/youtube/services/youtube.service';
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

  constructor(private youtubeService: YoutubeService, private router: Router) { }

  ngOnInit(): void {
    this.border = this.youtubeService.checkBorderColor(this.card);
  }

  open(id: string) {
    this.router.navigate([`/main/${id}`]);
  }
}
