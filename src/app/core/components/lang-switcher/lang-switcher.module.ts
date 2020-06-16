import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/modules/material.module';
import { LangSwitcherComponent } from './lang-switcher.component';

@NgModule({
  declarations: [
    LangSwitcherComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    LangSwitcherComponent
  ]
})
export class LangSwitcherModule { }
