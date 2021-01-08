import { NgModule } from '@angular/core';
import { FormUpdateComponent } from './form-update/form-update.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../../shared/modules/material.module';
import { FormModule } from '../../core/components/form/form.module';
import { FormToPdfComponent } from './form-to-pdf.component';
import { CommentModule } from './comment/comment.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FormUpdateComponent,
    FormToPdfComponent,
  ],
  imports: [
    TranslateModule,
    CommonModule,
    CommentModule,
    LayoutModule,
    MaterialModule,
    FormModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    FormUpdateComponent,
    FormToPdfComponent,
    CommentModule,
    CommonModule,
  ],
  providers: [],
})
export class FormToPdfModule {}
