import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AuthService]
})
export class AppComponent {

  constructor(
    private authService: AuthService,
    public translate: TranslateService,
    private router: Router ) {
    translate.addLangs(['ru', 'en']);
    translate.setDefaultLang('ru');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/ru|en/) ? browserLang : 'en');
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
