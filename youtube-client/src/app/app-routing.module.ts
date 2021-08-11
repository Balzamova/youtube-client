import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/guards/auth.guard';
import { NotFoundComponent } from './youtube/pages/not-found/not-found.component';

const routes: Routes = [
  { path: 'main',
    loadChildren: () => import('./youtube/youtube.module')
      .then(m => m.YoutubeModule),
    canLoad: [AuthGuard],
  },
  { path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
