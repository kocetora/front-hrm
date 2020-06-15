import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserInfo } from '../../shared/interfaces/userInfo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent {
  error: string;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  submit(user) {
    this.authService.login(user)
    .subscribe(
      (res: UserInfo) => {
      this.error = '';
      localStorage.setItem('jwt', res.token);
      localStorage.setItem('username', res.username);
      localStorage.setItem('userid', res.userid.toString());
      this.router.navigate(['/view']);
      },
      (err) => {
        this.error = err.error.message;
      });
    }
}
