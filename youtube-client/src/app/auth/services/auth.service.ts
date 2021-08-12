import { Injectable } from '@angular/core';
import { STORAGE_NAME } from '@app/shared/models/storage-name';
import { SharedService } from '@app/shared/services/shared.service';

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
}
