import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '@app/shared/services/shared.service';
import { UserDetailsCard } from '@app/youtube/models/user-details-card';
import { YoutubeService } from '@app/youtube/services/youtube.service';

@Component({
  selector: 'app-user-details-card',
  templateUrl: './user-details-card.component.html',
  styleUrls: ['./user-details-card.component.scss']
})
export class UserDetailsCardComponent implements OnInit {
  card: UserDetailsCard = {
    id: '',
    title: '',
    publishedAt: '',
    imageUrl: '',
    viewCount: '',
    likeCount: '',
    dislikeCount: '',
    commentCount: '',
    description: '',
  };

  border = '';

  cardDate: Date = new Date;

  constructor(private youtubeService: YoutubeService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkCard();
  }

  checkCard() {
    const cardId = this.route.snapshot.params.id;
    const card = this.youtubeService.getCardById(cardId);

    if (card) {
      this.card = card;
      this.border = this.youtubeService.checkBorderColor(card);
      this.cardDate = new Date(card.publishedAt);
    } else {
      this.router.navigate(['404'])
    }
  }

  goBack() {
    const id = this.sharedService.searchInputValue;

    this.router.navigate(['main', id]);
    this.sharedService.searchInputValue$.emit(id);
  }
}
