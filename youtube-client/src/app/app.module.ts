import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import {
    FilterInputComponent
} from './header/components/filters-block/components/filter-input/filter-input.component';
import {
    SortButtonsComponent
} from './header/components/filters-block/components/sort-buttons/sort-buttons.component';
import { FiltersBlockComponent } from './header/components/filters-block/filters-block.component';
import {
    LoginInfoBlockComponent
} from './header/components/login-info-block/login-info-block.component';
import { LogoComponent } from './header/components/logo/logo.component';
import { SearchBlockComponent } from './header/components/search-block/search-block.component';
import { HeaderComponent } from './header/header.component';
import { UserCardComponent } from './user/components/user-card/user-card.component';
import { UserListComponent } from './user/components/user-list/user-list.component';
import { FilterPipePipe } from './user/pipes/filter-pipe.pipe';
import { SettingsComponent } from './header/components/settings/settings.component';

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
