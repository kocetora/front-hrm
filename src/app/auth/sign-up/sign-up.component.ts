import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  providers: [AuthService],
})
export class SignUpComponent {
  error: string;

  constructor(private authService: AuthService, private router: Router) {}

  submit(user) {
    this.authService.signUp(user).subscribe(
      () => {
        this.error = '';
        // TODO: success message
        this.router.navigate(['/auth/login']);
      },
      (err) => {
        console.log(err)
        this.error = err.error;
      }
    );
  }
}
