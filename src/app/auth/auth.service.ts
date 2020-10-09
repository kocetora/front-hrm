import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from '../shared/interfaces/userInfo';
import { User } from '../shared/interfaces/user';
import { ApiRoutes } from '../shared/consts/api-routes.enum';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuth = false;

  constructor(private http: HttpClient) {}

  login(user: User): Observable<UserInfo> {
    const url = `${ApiRoutes.LOGIN}`;
    return this.http.post<UserInfo>(`${environment.API_URL}${url}`, user);
  }

  signUp(user: User): Observable<{}> {
    const url = `${ApiRoutes.SIGNUP}`;
    return this.http.post(`${environment.API_URL}${url}`, user);
  }

  logout(): Observable<{}> {
    const url = `${ApiRoutes.LOGOUT}`;
    return this.http.get(`${environment.API_URL}${url}`);
  }

  isAuthentificated() {
    if (localStorage.jwt) {
      this.isAuth = true;
      return this.isAuth;
    } else {
      this.isAuth = false;
      return this.isAuth;
    }
  }
}
