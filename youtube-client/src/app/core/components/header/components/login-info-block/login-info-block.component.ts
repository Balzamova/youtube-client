import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '@app/shared/services/shared.service';

const PHOTO_SRC = '../../../../../../assets/login.svg';
const YOUR_NAME = 'Your name';
const ADMIN_BTN = 'To admin';
const MAIN_BTN = 'To main';

@Component({
  selector: 'app-login-info-block',
  templateUrl: './login-info-block.component.html',
  styleUrls: ['./login-info-block.component.scss'],
})
export class LoginInfoBlockComponent implements OnInit {
  userName = YOUR_NAME;

  toggle = false;

  isAdminOpen = false;

  photoSrc = PHOTO_SRC;

  adminBtnName = ADMIN_BTN;

  constructor(private sharedService: SharedService, private router: Router) {}

  ngOnInit() {
    this.sharedService.userName$.subscribe((value) => {
      this.userName = 'Welcome, ' + value;
      this.toggle = true;
    });

    this.sharedService.searchInputValue$.subscribe((value) => {
      if (value && this.isAdminOpen) this.toAdmin();
    });

  }

  logout() {
    this.toggle = false;
    this.userName = YOUR_NAME;
    this.adminBtnName = ADMIN_BTN;
    this.router.navigate(['/auth']);
    this.sharedService.logout();
  }

  toAdmin() {
    if (!this.isAdminOpen) {
      this.isAdminOpen = !this.isAdminOpen;
      this.adminBtnName = MAIN_BTN;
      this.router.navigate(['/main/admin']);
    } else {
      this.isAdminOpen = !this.isAdminOpen;
      this.adminBtnName = ADMIN_BTN;
      this.router.navigate(['/main']);
    }
  }
}
