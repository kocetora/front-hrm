import { NgModule } from '@angular/core';
import { CommentComponent } from './comment/comment.component';
import { FormUpdateComponent } from './form-update/form-update.component';
import { ListComponent } from './list/list.component';
import { FilterComponent } from './filter/filter.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import {LayoutModule} from '@angular/cdk/layout';

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
      BrowserAnimationsModule,
      MatButtonModule,
      MatInputModule,
      MatSelectModule,
      MatCheckboxModule,
      LayoutModule
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
