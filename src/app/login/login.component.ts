import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/auth/auth.service';
import { Router } from '@angular/router';
import { CustomValidators } from '../core/validators/validator';
import { UserInfo } from '../core/auth/interfaces/userInfo';
import { User } from '../core/auth/interfaces/user';
import { UserService } from '../core/auth/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService, 
    private userService: UserService,
    private router: Router
    ) { }
  form: FormGroup;
  error: string;

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        CustomValidators.noWhitespace
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25),
        CustomValidators.noWhitespace
        ])
      });
  }

  submit() {
    if (this.form.valid) {
    const user: User = {...this.form.value};
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
        this.error = err.error.text;
      });
    }
  }
}
