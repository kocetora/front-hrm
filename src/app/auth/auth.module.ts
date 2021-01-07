import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthFormModule } from './auth-form/auth-form.module';
import { RouterModule } from '@angular/router';
import { NewAdminComponent } from './new-admin/new-admin.component';

@NgModule({
  declarations: [
    LoginComponent, 
    SignUpComponent, 
    NewAdminComponent
  ],
  imports: [
    TranslateModule, 
    RouterModule, 
    AuthFormModule
  ],
  exports: [
    LoginComponent, 
    SignUpComponent, 
    NewAdminComponent, 
    AuthFormModule
  ],
  providers: [],
})
export class AuthModule {}
