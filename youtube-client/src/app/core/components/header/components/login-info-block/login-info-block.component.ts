import { Component } from '@angular/core';

@Component({
  selector: 'app-login-info-block',
  templateUrl: './login-info-block.component.html',
  styleUrls: ['./login-info-block.component.scss']
})
export class LoginInfoBlockComponent {
  userName = 'Your name';

  photoSrc = '../../../../../../assets/login.svg';

  constructor() {}
}
