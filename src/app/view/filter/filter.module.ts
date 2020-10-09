import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/modules/material.module';
import { ControlErrorModule } from 'src/app/core/components/control-error/control-error.module';

@NgModule({
  declarations: [FilterComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MaterialModule,
    ReactiveFormsModule,
    ControlErrorModule,
  ],
  exports: [FilterComponent],
})
export class FilterModule {}
