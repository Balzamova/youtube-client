import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '@app/shared/services/shared.service';

const PHOTO_SRC = '../../../../../../assets/login.svg';
const YOUR_NAME = 'Your name';

@Component({
  selector: 'app-login-info-block',
  templateUrl: './login-info-block.component.html',
  styleUrls: ['./login-info-block.component.scss'],
})
export class LoginInfoBlockComponent implements OnInit {
  userName = YOUR_NAME;

  toggle = false;

  photoSrc = PHOTO_SRC;

  constructor(private sharedService: SharedService, private router: Router) {}

  ngOnInit() {
    this.sharedService.userName$.subscribe((value) => {
      this.userName = 'Welcome, ' + value;
      this.toggle = true;
    });
  }

  logout() {
    this.toggle = false;
    this.userName = YOUR_NAME;
    this.router.navigate(['/auth']);
    this.sharedService.logout();
  }
}
