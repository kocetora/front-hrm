import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { LoginComponent } from './login/login.component';
import { ViewComponent } from './view/view.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './core/auth/auth.guard';
import { FormUpdateComponent } from './form-update/form-update.component';


const routes: Routes = [
  {path: '', component: FormComponent},
  {path: 'login', component: LoginComponent},
  {path: 'view', component: ViewComponent, 
    canActivate: [AuthGuard], canActivateChild: [AuthGuard], 
    children: [
      {path:'form', component: FormUpdateComponent }
  ]},
  {path: 'error', component: ErrorComponent},
  {path: '**', redirectTo: '/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
