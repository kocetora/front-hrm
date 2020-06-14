import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { Router } from '@angular/router';
import { CustomValidators } from '../core/validators/validator';
import { User } from '../core/auth/interfaces/user';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [AuthService]
})
export class SignUpComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
    ) { }
  form: any;
  error: string;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        CustomValidators.noWhitespace]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25),
        CustomValidators.noWhitespace]]
    });
  }

  submit() {
    if (this.form.valid) {
    const user: User = {...this.form.value};
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
}
