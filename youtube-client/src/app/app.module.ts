import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
    FilterInputComponent
} from './filters-block/components/filter-input/filter-input.component';
import {
    SortButtonsComponent
} from './filters-block/components/sort-buttons/sort-buttons.component';
import { FiltersBlockComponent } from './filters-block/filters-block.component';
import { FooterComponent } from './footer/footer.component';
import {
    LoginInfoBlockComponent
} from './header/components/login-info-block/login-info-block.component';
import { SearchBlockComponent } from './header/components/search-block/search-block.component';
import {
    SettingsBlockComponent
} from './header/components/settings-block/settings-block.component';
import { HeaderComponent } from './header/header.component';
import { UserCardComponent } from './user/components/user-card/user-card.component';
import { UserListComponent } from './user/components/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UserCardComponent,
    UserListComponent,
    FooterComponent,
    SearchBlockComponent,
    SettingsBlockComponent,
    LoginInfoBlockComponent,
    FilterInputComponent,
    SortButtonsComponent,
    HeaderComponent,
    FiltersBlockComponent,
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
