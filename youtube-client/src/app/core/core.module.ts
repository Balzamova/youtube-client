import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

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

const coreComponents = [
  FooterComponent,
  SearchBlockComponent,
  LoginInfoBlockComponent,
  LogoComponent,
  FilterInputComponent,
  SortButtonsComponent,
  HeaderComponent,
  FiltersBlockComponent,
  SettingsComponent,
];

@NgModule({
  declarations: [...coreComponents],
  imports: [CommonModule],
  exports: [...coreComponents],
})
export class CoreModule {}
