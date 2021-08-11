import { Injectable } from '@angular/core';
import { STORAGE_NAME } from '@app/shared/models/storage-name';
import { SharedService } from '@app/shared/services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl = '';

  constructor(private sharedService: SharedService) { }

  canLogin(login: string): boolean {
    return this.saveLoginToStorage(login);
  }

  saveLoginToStorage(login: string): boolean {
    localStorage.setItem(STORAGE_NAME, login);
    return true;
  }

  // isLoggedIn(): boolean {
  //   const user = localStorage.getItem(STORAGE_NAME);

  //   if (user) {
  //     this.sharedService.userName = user;
  //     return true;
  //   }
  //   return false;
  // }
}
