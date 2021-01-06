import { Routes } from '@angular/router';
import { RouteNames } from '../shared/consts/route-names.enum';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NewAdminComponent } from './new-admin/new-admin.component';
import { AdminGuard } from '../core/guards/admin.guard';

export const authRoutes: Routes = [
  {
    path: '',
    redirectTo: RouteNames.LOGIN,
    pathMatch: 'full',
  },
  {
    path: RouteNames.LOGIN,
    component: LoginComponent,
  },
  {
    path: RouteNames.SIGH_UP,
    component: SignUpComponent,
  },
  {
    path: RouteNames.NEW_ADMIN,
    component: NewAdminComponent,
    canActivate: [AdminGuard],
  },
];
