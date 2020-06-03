import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CustomValidators } from '../validators/validator';

interface Token {
  username: string;
  token: string;
}

interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }
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
      (res: Token) => {
      this.error = '';
      localStorage.setItem('jwt', res.token);
      // console.log(localStorage.jwt);
      // localStorage.getItem('jwt');
      this.router.navigate(['/view']);
      },
      (err) => {
        this.error = err.error.text;
      });
    }
  }

  loginUser(user) {
    return this.http.post('api/login', JSON.stringify(user, null, 2));
  }
}
