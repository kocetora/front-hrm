import { NgModule } from '@angular/core';
import { FormToPdfModule } from './form-to-pdf/form-to-pdf.module';
import { ListComponent } from './list/list.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../shared/modules/material.module';
import { FilterModule } from './filter/filter.module';
import { FormModule } from '../core/components/form/form.module';
import { ViewComponent } from './view.component';

@NgModule({
  declarations: [ListComponent, ViewComponent],
  imports: [
    TranslateModule,
    CommonModule,
    LayoutModule,
    MaterialModule,
    FormModule,
    FilterModule,
    FormToPdfModule,
  ],
  exports: [
    ListComponent,
    FilterModule,
    ViewComponent,
    CommonModule,
    FormToPdfModule,
  ],
  providers: [],
})
export class ViewModule {}
