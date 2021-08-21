import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { INTERCEPTOR_PROVIDERS } from './shared/interceptors/providers';
import { YoutubeModule } from './youtube/youtube.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CoreModule,
    YoutubeModule,
    AuthModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
  ],
  providers: [INTERCEPTOR_PROVIDERS],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule { }
