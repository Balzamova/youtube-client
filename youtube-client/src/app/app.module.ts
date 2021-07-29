import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserCardComponent } from './user/components/user-card/user-card.component';
import { UserListComponent } from './user/components/user-list/user-list.component';
import { HeaderComponent } from './header/components/header/header.component';
import { FooterComponent } from './footer/components/footer/footer.component';
import { SearchComponent } from './search/components/search/search.component';
import { SortComponent } from './sort/components/sort/sort.component';

@NgModule({
  declarations: [
    AppComponent,
    UserCardComponent,
    UserListComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    SortComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule { }
