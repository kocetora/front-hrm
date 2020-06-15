import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ViewComponent } from './view/view.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { AppViewModule } from './view/view.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AppControlErrorModule } from './core/components/control-error/control-error.module';
import { MaterialModule } from './material.module';
import { AppFormModule } from './core/components/form/form.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    CreateFormComponent,
    ViewComponent,
    LoginComponent,
    ErrorComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppViewModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppControlErrorModule,
    MaterialModule,
    AppFormModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
