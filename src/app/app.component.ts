import { Component, ViewChild } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AuthService]
})
export class AppComponent {
  @ViewChild('drawer') drawer: any;

  constructor(private authService: AuthService, private router: Router ) { }

  closeSideNav() {
    if (this.drawer._mode === 'over') {
      this.drawer.close();
    }
  }

  logout() {
    this.authService.logout()
    .subscribe(
      () => {
      localStorage.removeItem('jwt');
      localStorage.removeItem('username');
      localStorage.removeItem('userid');
      this.router.navigate(['/']);
      });
  }

  isAuth() {
    if (true === this.authService.isAuthentificated()) {
      return true;
    } else {
      return false;
    }
  }
}
