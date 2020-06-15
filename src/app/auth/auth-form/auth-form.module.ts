import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/modules/material.module';
import { ControlErrorModule } from '../../core/components/control-error/control-error.module';
import { AuthFormComponent } from './auth-form.component';

@NgModule({
  declarations: [
    AuthFormComponent
  ],
  imports: [
      TranslateModule,
      ReactiveFormsModule,
      MaterialModule,
      ControlErrorModule,
  ],
  exports: [
    AuthFormComponent
  ],
  providers: [],
})
export class AuthFormModule { }
