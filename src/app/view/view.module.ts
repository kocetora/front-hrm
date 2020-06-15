import { NgModule } from '@angular/core';
import { CommentComponent } from './comment/comment.component';
import { FormUpdateComponent } from './form-update/form-update.component';
import { ListComponent } from './list/list.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../material.module';
import { AppControlErrorModule } from '../core/components/control-error/control-error.module';
import { AppFilterModule } from './filter/filter.module';
import { AppFormModule } from '../core/components/form/form.module';


@NgModule({
  declarations: [
    CommentComponent,
    FormUpdateComponent,
    ListComponent,
  ],
  imports: [
      TranslateModule,
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      LayoutModule,
      MaterialModule,
      AppControlErrorModule,
      AppFormModule
  ],
  exports: [
    CommentComponent,
    FormUpdateComponent,
    ListComponent,
    AppFilterModule,
    CommonModule
  ],
  providers: [],
})
export class AppViewModule { }
