import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardInfoComponent } from './components/card-info/card-info.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import {
    UserDetailsCardComponent
} from './components/user-details-card/user-details-card.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FilterPipe } from './pipes/filter.pipe';
import { YoutubeService } from './services/youtube.service';
import { YoutubeRoutingModule } from './youtube-routing.module';

const youtubeComponents = [
  UserListComponent,
  UserCardComponent,
  FilterPipe,
  NotFoundComponent,
  UserDetailsCardComponent,
  MainPageComponent,
  CardInfoComponent
];

@NgModule({
  declarations: [...youtubeComponents],
  imports: [
    CommonModule,
    YoutubeRoutingModule
  ],
  exports: [...youtubeComponents],
  providers: [YoutubeService],
})
export class YoutubeModule {}
