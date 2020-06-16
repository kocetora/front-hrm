import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ErrorComponent } from './error/error.component';
import { ViewModule } from './view/view.module';
import { MaterialModule } from './shared/modules/material.module';
import { FormModule } from './core/components/form/form.module';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { LangSwitcherModule } from './core/components/lang-switcher/lang-switcher.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    CreateFormComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    ViewModule,
    FormModule,
    AuthModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    LangSwitcherModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
