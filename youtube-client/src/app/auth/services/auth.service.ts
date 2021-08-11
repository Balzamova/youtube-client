import { Injectable } from '@angular/core';

const STORAGE_NAME = 'user-youtube-app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl = '';

  constructor() { }

  canLogin(login: string): boolean {
    return this.saveLoginToStorage(login);
  }

  saveLoginToStorage(login: string): boolean {
    localStorage.setItem(STORAGE_NAME, login);
    return true;
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem(STORAGE_NAME);

    if (user) return true;
    return false;
  }
}
