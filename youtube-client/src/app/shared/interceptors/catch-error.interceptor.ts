import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NotificationService } from '../services/notification.service';

const ERROR_MESSAGE = 'Request limit exceeded. Try again later';

@Injectable()
export class CatchErrorInterceptor implements HttpInterceptor {

  constructor(private notification: NotificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        this.notification.showNotification(ERROR_MESSAGE);
        return throwError(error);
      })
    );
  }
}
