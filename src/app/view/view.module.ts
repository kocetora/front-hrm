import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../shared/modules/material.module';
import { FilterModule } from './filter/filter.module';
import { ViewComponent } from './view.component';
import { FormViewModule } from './form-view/form-view.module';

@NgModule({
  declarations: [
    ViewComponent,
    ListComponent,
  ],
  imports: [
    TranslateModule,
    CommonModule,
    LayoutModule,
    MaterialModule,
    FilterModule,
    FormViewModule,
  ],
  exports: [
    ViewComponent,
    CommonModule,
    ListComponent,
    FilterModule,
    FormViewModule,
  ],
  providers: [],
})
export class ViewModule {}
