import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { User } from './user';
import { Token } from './token';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  constructor(private LoginService: LoginService, private http: HttpClient) { }
  form: FormGroup;
  error: string;

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25)
        ])
      });
  }

  submit() {
    if (this.form.valid) {
    const user: User = {...this.form.value};
    this.LoginService.loginUser(user)
    .subscribe(
      (res: Token) => {
      this.error = '';
      localStorage.setItem('jwt', res.token);
      console.log(localStorage.jwt);
      localStorage.getItem('jwt');
      // this.form.reset();
      },
      (err) => {
        console.log(err.error.text);
        this.error = err.error.text;
      });
    }
  }

  loginUser(user) {
    return this.http.post('api/login', JSON.stringify(user, null, 2));
  }
}
