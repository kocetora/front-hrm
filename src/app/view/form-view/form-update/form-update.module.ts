import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormUpdateComponent } from './form-update.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/modules/material.module';
import { ControlErrorModule } from 'src/app/core/components/control-error/control-error.module';
import { FormModule } from 'src/app/core/components/form/form.module';

@NgModule({
  declarations: [FormUpdateComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MaterialModule,
    ReactiveFormsModule,
    ControlErrorModule,
    FormModule,
  ],
  exports: [FormUpdateComponent],
})
export class FormUpdateModule {}
