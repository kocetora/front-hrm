import { Routes } from '@angular/router';
import { CreateFormComponent } from './create-form/create-form.component';
import { ViewComponent } from './view/view.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RouteNames } from './shared/consts/route-names.enum';

export const appRoutes: Routes = [
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
    path: RouteNames.AUTH,
    loadChildren: './auth/auth.module#AuthModule'
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

