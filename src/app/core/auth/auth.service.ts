import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from './interfaces/token';
import { User } from './interfaces/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private isAuth = false;

    constructor(private http: HttpClient) { }

    login(user: User): Observable<{}> {
        const url = `api/login`;
        return this.http.post<Token>(url, user);
    }

    logout(): Observable<{}> {
        const url = `api/logout`;
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
