import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  providers: [AuthService],
})
export class SignUpComponent {
  error: string;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private _snackBar: MatSnackBar) {}


  submit(user) {
    this.authService.signUp(user).subscribe(
      () => {
        this.error = '';
        this._snackBar.open('User successfully created!:)', 'Close', {
          duration: 5000,
        });
        this.router.navigate(['/auth/login']);
      },
      (err) => {
        console.log(err)
        this.error = err.error;
      }
    );
  }
}
