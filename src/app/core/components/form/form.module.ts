import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormComponent} from './form.component';
import {TranslateModule} from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/modules/material.module';
import { AppControlErrorModule } from '../control-error/control-error.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    AppControlErrorModule
  ],
  declarations: [FormComponent],
  exports: [FormComponent],
})
export class AppFormModule {
}
