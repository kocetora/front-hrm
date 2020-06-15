import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterComponent} from './filter.component';
import {TranslateModule} from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/modules/material.module';
import { AppControlErrorModule } from 'src/app/core/components/control-error/control-error.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    AppControlErrorModule
  ],
  declarations: [FilterComponent],
  exports: [FilterComponent],
})
export class AppFilterModule {
}
