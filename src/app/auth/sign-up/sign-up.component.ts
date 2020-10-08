import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
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
      this.router.navigate(['/auth/login']);
      },
      (err) => {
        console.log(err.error);
        // this.error = 'This username is already taken. Please choose another one.';
        // this.error = err.error;
      });
  }
}
