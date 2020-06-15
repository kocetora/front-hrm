import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from '../shared/interfaces/userInfo';
import { User } from '../shared/interfaces/user';
import { ApiRoutes } from '../shared/consts/api-routes.enum';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private isAuth = false;

    constructor(private http: HttpClient) { }

    login(user: User): Observable<UserInfo> {
        const url = ApiRoutes.login;
        return this.http.post<UserInfo>(url, user);
    }

    signUp(user: User): Observable<{}> {
        const url = ApiRoutes.signUp;
        return this.http.post(url, user);
    }

    logout(): Observable<{}> {
        const url = ApiRoutes.logout;
        return this.http.get(url);
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
