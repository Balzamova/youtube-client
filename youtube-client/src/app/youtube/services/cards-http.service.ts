import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseYoutubeResponse } from '@app/shared/models/base-youtube-response';
import { FullYoutubeResponse } from '@app/shared/models/full-youtube-response';
import { SearchYoutubeKind } from '@app/shared/models/search-youtube-kind';
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
        return this.http.get<BaseYoutubeResponse>(`${config.searchUrl}${value}`);
      }),
      finalize(() => { this.progressBar.hide(); }),
    );
  }

  getStatistics(ids: string[]) {
    this.progressBar.show();
    return this.configService.getConfig().pipe(
      switchMap((config) => {
        return this.http.get<FullYoutubeResponse>(
          `${config.statisticsUrl}${ids.join(',')}${config.statisticsConfigUrl}`
        );
      }),
      finalize(() => { this.progressBar.hide(); }),
    );
  }
}
