import { NgModule } from '@angular/core';
import { CommentComponent } from './comment/comment.component';
import { FormUpdateComponent } from './form-update/form-update.component';
import { ListComponent } from './list/list.component';
import { FilterComponent } from './filter/filter.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    CommentComponent,
    FormUpdateComponent,
    ListComponent,
    FilterComponent,
  ],
  imports: [
      TranslateModule,
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
  ],
  exports: [
    CommentComponent,
    FormUpdateComponent,
    ListComponent,
    FilterComponent,
    CommonModule
  ],
  providers: [],
})
export class ViewModule { }
