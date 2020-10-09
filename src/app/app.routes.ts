import { Routes } from '@angular/router';
import { CreateFormComponent } from './create-form/create-form.component';
import { ViewComponent } from './view/view.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RouteNames } from './shared/consts/route-names.enum';
import { authRoutes } from './auth/auth.routes';

export const appRoutes: Routes = [
  {
    path: '',
    component: CreateFormComponent,
    pathMatch: 'full',
  },
  {
    path: RouteNames.VIEW,
    component: ViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: RouteNames.AUTH,
    children: authRoutes,
  },
  {
    path: '**',
    redirectTo: '',
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];
