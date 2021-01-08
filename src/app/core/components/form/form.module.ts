import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/modules/material.module';
import { ControlErrorModule } from '../control-error/control-error.module';

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MaterialModule,
    ReactiveFormsModule,
    ControlErrorModule, 
  ],
  exports: [FormComponent],
})
export class FormModule {}
