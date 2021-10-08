import { Component } from '@angular/core';

import { NotificationService } from './shared/services/notification.service';
import { ProgressBarService } from './shared/services/progress-bar.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public progressBar: ProgressBarService, private notice: NotificationService) {}
}
