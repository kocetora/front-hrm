import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from './interfaces/userInfo';
import { User } from './interfaces/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private isAuth = false;

    constructor(private http: HttpClient) { }

    login(user: User): Observable<UserInfo> {
        const url = `login`;
        return this.http.post<UserInfo>(url, user);
    }

    logout(): Observable<{}> {
        const url = `logout`;
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
