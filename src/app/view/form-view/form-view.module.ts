import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormViewComponent } from './form-view.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/modules/material.module';
import { FormUpdateModule } from './form-update/form-update.module';
import { CommentModule } from './comment/comment.module';
import { FormToPdfComponent } from './form-to-pdf/form-to-pdf.component';

@NgModule({
  declarations: [
    FormViewComponent, 
    FormToPdfComponent,
],
  imports: [
    CommonModule,
    TranslateModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FormUpdateModule,
    CommentModule,
  ],
  exports: [
    FormViewComponent,
    FormUpdateModule,
    FormToPdfComponent,
    CommentModule,
    ],
})
export class FormViewModule { }
