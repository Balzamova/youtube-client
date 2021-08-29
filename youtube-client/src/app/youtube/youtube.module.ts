import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AdminCardComponent } from './components/admin-card/admin-card.component';
import { AdminListComponent } from './components/admin-list/admin-list.component';
import { CardInfoComponent } from './components/card-info/card-info.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import {
    UserDetailsCardComponent
} from './components/user-details-card/user-details-card.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DigitConversionPipe } from './pipes/digit-conversion.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { YoutubeService } from './services/youtube.service';
import { cardsReducer } from './store/reducer';
import { YoutubeRoutingModule } from './youtube-routing.module';

const youtubeComponents = [
  UserListComponent,
  UserCardComponent,
  FilterPipe,
  DigitConversionPipe,
  NotFoundComponent,
  UserDetailsCardComponent,
  MainPageComponent,
  CardInfoComponent,
  AdminCardComponent,
  AdminListComponent
];

@NgModule({
  declarations: [...youtubeComponents],
  imports: [
    CommonModule,
    YoutubeRoutingModule,
    HttpClientModule,
    StoreModule.forFeature(
      'cardsState', cardsReducer,
    ),
  ],
  exports: [...youtubeComponents, HttpClientModule],
  providers: [YoutubeService],
})
export class YoutubeModule {}
