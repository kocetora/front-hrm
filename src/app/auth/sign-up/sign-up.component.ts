import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [AuthService]
})
export class SignUpComponent {
  error: string;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  submit(user) {
    this.authService.signUp(user)
    .subscribe(
      () => {
      this.error = '';
      this.router.navigate(['/login']);
      },
      () => {
        this.error = 'This username is already taken. Please choose another one.';
      });
  }
}
