import { Injectable } from '@angular/core';

import { STORAGE_NAME } from '../models/storage-name';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  userName = '';

  constructor() {}

  isLoggedIn(): boolean {
    const user = localStorage.getItem(STORAGE_NAME);

    if (user) {
      this.userName = user;
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(STORAGE_NAME);
  }
}
