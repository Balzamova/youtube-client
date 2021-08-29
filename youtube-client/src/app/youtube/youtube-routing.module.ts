import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminListComponent } from './components/admin-list/admin-list.component';
import {
    UserDetailsCardComponent
} from './components/user-details-card/user-details-card.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  {
    path: '', component: MainPageComponent,
    children: [
      { path: 'admin', component: AdminListComponent },
      { path: 'card/:id', component: UserDetailsCardComponent },
      { path: ':id', component: UserListComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YoutubeRoutingModule { }
