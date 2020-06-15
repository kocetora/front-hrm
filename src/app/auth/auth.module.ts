import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/modules/material.module';
import { AppControlErrorModule } from '../core/components/control-error/control-error.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    AuthFormComponent
  ],
  imports: [
      TranslateModule,
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      MaterialModule,
      AppControlErrorModule,
      RouterModule
  ],
  exports: [
    LoginComponent,
    SignUpComponent,
    AuthFormComponent,
    CommonModule
  ],
  providers: [],
})
export class AppAuthModule { }
