import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserInfo } from '../../shared/interfaces/userInfo';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [AuthService],
})
export class LoginComponent {

  constructor(
    private authService: AuthService, 
    private router: Router,
    private _snackBar: MatSnackBar) {}

  submit(user) {
    this.authService.login(user).subscribe(
      (res: UserInfo) => {
        localStorage.setItem('jwt', res.token);
        localStorage.setItem('username', res.username);
        localStorage.setItem('role', res.role);
        localStorage.setItem('userid', res.userid.toString());
        this._snackBar.open('You successfully logged in!:)', 'Close', {
          duration: 5000,
        });
        this.router.navigate(['/view']);;
      },
      (err) => {
        this._snackBar.open(err.error, 'Close', {
          duration: 5000,
        }); 
      }
    );
  }
}
