import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
  } from '@angular/router';
  import { Observable } from 'rxjs';
  import { Injectable } from '@angular/core';

  @Injectable({ providedIn: 'root' })
  export class AdminGuard implements CanActivate {
    constructor(private router: Router) {}
  
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
      if (localStorage.getItem('role') === 'admin') {
        return true;
      } else {
        this.router.navigate(['/error']);
      }
    }
  }
  