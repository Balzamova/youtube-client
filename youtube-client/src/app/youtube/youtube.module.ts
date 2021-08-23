import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserCardComponent } from './components/user-card/user-card.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { YoutubeService } from './services/youtube.service';

const youtubeComponents = [UserListComponent, UserCardComponent, FilterPipePipe];

@NgModule({
  declarations: [...youtubeComponents],
  imports: [CommonModule],
  exports: [...youtubeComponents],
  providers: [YoutubeService],
})
export class YoutubeModule {}
