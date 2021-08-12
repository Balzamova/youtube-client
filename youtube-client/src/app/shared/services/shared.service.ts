import { EventEmitter, Injectable } from '@angular/core';

import { STORAGE_NAME } from '../models/storage-name';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public onFilter$ = new EventEmitter<string>();

  public onSort$ = new EventEmitter<string>();

  userName = '';

  public userName$ = new EventEmitter<string>();

  searchInputValue = '';

  filterInputValue = '';

  constructor() {}

  isLoggedIn(): boolean {
    const user = localStorage.getItem(STORAGE_NAME);

    if (user) {
      this.userName$.emit(user)
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(STORAGE_NAME);
  }
}
