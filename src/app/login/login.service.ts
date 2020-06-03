import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { Token } from './token';

@Injectable()
export class LoginService {

    constructor(private http: HttpClient) { }

    loginUser(user: User): Observable<{}> {
        const url = `api/login`;
        return this.http.post<Token>(url, user);
    }
}
