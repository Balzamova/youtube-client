import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {
  login = '';

  password = '';

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  loginInput(value: string) {
    this.login = value;
  }

  passwordInput(value: string) {
    this.password = value;
  }

  onLogin(event: Event) {
    event?.preventDefault();

    if (!this.login || !this.password) return;

    if (this.authService.canLogin(this.login)) {
      this.router.navigate(['/main']);
      this.sharedService.userName = this.login;
    }
  }

}
