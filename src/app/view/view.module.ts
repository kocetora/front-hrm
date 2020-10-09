import { NgModule } from '@angular/core';
import { FormUpdateComponent } from './form-update/form-update.component';
import { ListComponent } from './list/list.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../shared/modules/material.module';
import { FilterModule } from './filter/filter.module';
import { FormModule } from '../core/components/form/form.module';
import { CommentModule } from './comment/comment.module';
import { ViewComponent } from './view.component';

@NgModule({
  declarations: [FormUpdateComponent, ListComponent, ViewComponent],
  imports: [
    TranslateModule,
    CommonModule,
    LayoutModule,
    MaterialModule,
    FormModule,
    CommentModule,
    FilterModule,
  ],
  exports: [
    FormUpdateComponent,
    ListComponent,
    FilterModule,
    ViewComponent,
    CommentModule,
    CommonModule,
  ],
  providers: [],
})
export class ViewModule {}
