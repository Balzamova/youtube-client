import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import {
    FilterInputComponent
} from './components/header/components/filters-block/components/filter-input/filter-input.component';
import {
    SortButtonsComponent
} from './components/header/components/filters-block/components/sort-buttons/sort-buttons.component';
import {
    FiltersBlockComponent
} from './components/header/components/filters-block/filters-block.component';
import {
    LoginInfoBlockComponent
} from './components/header/components/login-info-block/login-info-block.component';
import { LogoComponent } from './components/header/components/logo/logo.component';
import {
    SearchBlockComponent
} from './components/header/components/search-block/search-block.component';
import { SettingsComponent } from './components/header/components/settings/settings.component';
import { HeaderComponent } from './components/header/header.component';
import { UserCardComponent } from './user/components/user-card/user-card.component';
import { UserListComponent } from './user/components/user-list/user-list.component';
import { FilterPipePipe } from './user/pipes/filter-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UserCardComponent,
    UserListComponent,
    FooterComponent,
    SearchBlockComponent,
    LoginInfoBlockComponent,
    LogoComponent,
    FilterInputComponent,
    SortButtonsComponent,
    HeaderComponent,
    FiltersBlockComponent,
    FilterPipePipe,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule { }
