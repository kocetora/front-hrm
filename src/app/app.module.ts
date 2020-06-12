import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ViewComponent } from './view/view.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { CommentComponent } from './comment/comment.component';
import { FormUpdateComponent } from './form-update/form-update.component';
import { ListComponent } from './list/list.component';
import { FilterComponent } from './filter/filter.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ViewComponent,
    LoginComponent,
    ErrorComponent,
    CommentComponent,
    FormUpdateComponent,
    ListComponent,
    FilterComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
