import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '@app/shared/services/notification.service';
import { AppState } from '@app/store/state';
import { Store } from '@ngrx/store';

import * as CardsActions from '../../store/actions';

const MESSAGE = 'New card created';

@Component({
  selector: 'app-admin-card',
  templateUrl: './admin-card.component.html',
  styleUrls: ['./admin-card.component.scss'],
})
export class AdminCardComponent {
  title = '';

  desc = '';

  image = '';

  video = '';

  constructor(
    private store: Store<AppState>,
    private notification: NotificationService
  ) {}

  titleInput(value: string) {
    this.title = value;
  }

  descInput(value: string) {
    this.desc = value;
  }

  imageInput(value: string) {
    this.image = value;
  }

  videoInput(value: string) {
    this.video = value;
  }

  create(event: Event) {
    event.preventDefault();

    if (!this.title || !this.desc || !this.image || !this.video) return;

    const card = {
      title: this.title,
      imageUrl: this.image,
      description: this.desc,
      videoUrl: this.video,
    };

    this.store.dispatch(CardsActions.createCard({ card: card }));
    this.notification.showNotification(MESSAGE);
  }
}
