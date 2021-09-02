import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseYoutubeResponse } from '@app/shared/models/base-youtube-response';
import { FullYoutubeResponse } from '@app/shared/models/full-youtube-response';
import { ConfigService } from '@app/shared/services/config.service';
import { ProgressBarService } from '@app/shared/services/progress-bar.service';

import { delay, finalize, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CardsHttpService {
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private progressBar: ProgressBarService,
  ) {}

  getCards(value: string) {
    this.progressBar.show();

    return this.configService.getConfig().pipe(
      delay(2000),
      take(1),
      switchMap((config) => {
        const url = `${config.searchUrl}${value}`;
        
        return this.http.get<BaseYoutubeResponse>(url);
      }),
      finalize(() => { this.progressBar.hide(); }),
    );
  }

  getStatistics(ids: string[]) {
    this.progressBar.show();
    return this.configService.getConfig().pipe(
      switchMap((config) => {
        const url = `${config.statisticsUrl}${ids.join(',')}${config.statisticsConfigUrl}`;

        return this.http.get<FullYoutubeResponse>(url);
      }),
      finalize(() => { this.progressBar.hide(); }),
    );
  }
}
