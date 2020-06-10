import { Injectable } from '@angular/core';
import { UserInfo } from './interfaces/userInfo';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: UserInfo;

  getUser(): UserInfo {
    return this.user;
  }

  setUser(user: UserInfo): void {
    this.user = user;
  }
}
