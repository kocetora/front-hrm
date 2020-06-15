import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlErrorComponent} from './control-error.component';
import {TranslateModule} from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [ControlErrorComponent],
  exports: [ControlErrorComponent],
})
export class AppControlErrorModule {
}
