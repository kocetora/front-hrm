import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService]
})
export class AppComponent {

  constructor(
    private authService: AuthService,
    public translate: TranslateService,
    private router: Router
    ) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
  }

  logout() {
    this.authService.logout()
    .subscribe(
      () => {
      localStorage.removeItem('jwt');
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
