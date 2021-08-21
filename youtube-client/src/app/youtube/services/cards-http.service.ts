import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseYoutubeResponse } from '@app/shared/models/base-youtube-response';
import { FullYoutubeResponse } from '@app/shared/models/full-youtube-response';
import { ConfigService } from '@app/shared/services/config.service';
import { NotificationService } from '@app/shared/services/notification.service';
import { ProgressBarService } from '@app/shared/services/progress-bar.service';

import { throwError } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';

const ERROR_MESSAGE = 'Request limit exceeded. Try again later';

@Injectable({
  providedIn: 'root',
})
export class CardsHttpService {
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private progressBar: ProgressBarService,
    private notification: NotificationService,
  ) {}

  getCards(value: string) {
    this.progressBar.show();

    return this.configService.getConfig().pipe(
      switchMap((config) => {
        return this.http.get<BaseYoutubeResponse>(`${config.searchUrl}${value}`);
      }),
      catchError(error => {
        this.notification.showNotification(ERROR_MESSAGE);
        return throwError(error);
      }),
    );
  }

  getStatistics(ids: string[]) {
    return this.configService.getConfig().pipe(
      switchMap((config) => {
        return this.http.get<FullYoutubeResponse>(
          `${config.statisticsUrl}${ids.join(',')}${config.statisticsConfigUrl}`
        );
      }),
      catchError(error => {
        this.notification.showNotification(ERROR_MESSAGE);
        return throwError(error);
      }),
      finalize(() => { this.progressBar.hide(); }),
    );
  }
}
