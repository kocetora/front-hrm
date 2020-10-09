import { Routes } from '@angular/router';
import { RouteNames } from '../shared/consts/route-names.enum';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

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
];
