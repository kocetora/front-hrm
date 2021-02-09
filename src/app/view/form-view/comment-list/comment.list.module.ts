import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentListComponent } from './comment-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ControlErrorModule } from 'src/app/core/components/control-error/control-error.module';
import { FormModule } from 'src/app/core/components/form/form.module';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [CommentListComponent, CommentComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MaterialModule,
    ReactiveFormsModule,
    ControlErrorModule,
    FormModule,
  ],
  exports: [CommentListComponent, CommentComponent],
})
export class CommentListModule {}
