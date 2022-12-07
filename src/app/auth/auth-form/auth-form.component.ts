import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { noWhitespace } from '../../shared/validators/noWhitespace';
import { User } from '../../shared/interfaces/user';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
  public form: UntypedFormGroup;

  @Output() onsubmit: EventEmitter<User> = new EventEmitter<User>();
  @Input() error: string;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.form = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          noWhitespace,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(25),
          noWhitespace,
        ],
      ],
    });
  }

  submit() {
    if (this.form.valid) {
      const user: User = { ...this.form.value };
      this.onsubmit.emit(user);
    }
  }
}
