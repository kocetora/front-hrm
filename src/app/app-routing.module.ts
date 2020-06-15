import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateFormComponent } from './create-form/create-form.component';
import { ViewComponent } from './view/view.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RouteNames } from './shared/consts/route-names.enum';

const appRoutes: Routes = [
  {
    path: '',
    component: CreateFormComponent,
    pathMatch: 'full'
  },
  {
    path: RouteNames.VIEW,
    component: ViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**', 
    redirectTo: ''
  },
  {
    path: '**', 
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
