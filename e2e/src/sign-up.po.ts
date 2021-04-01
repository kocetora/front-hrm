// import { browser, by, element } from 'protractor';

// export class AppPage {
//   navigateTo(): Promise<unknown> {
//     return browser.get(browser.baseUrl) as Promise<unknown>;
//   }

//   getTitleText(): Promise<string> {
//     return element(by.css('app-root .content span')).getText() as Promise<
//       string
//     >;
//   }
// }

import { browser, element, by } from 'protractor';

export class SignUpPage {
  successSignUpMassage = 'User successfully created!:)';

  navigateTo(): Promise<unknown> {
    return browser.get('/#/auth/sign-up') as Promise<unknown>;
  }

  getUsernameInput() {
    return element(by.name('username'));
  }

  getPasswordInput() {
    return element(by.name('password'));
  }

  getSubmitButton() {
    return element(by.name('submit'));
  }

  getSnackBarText(): Promise<string> {
    return element(by.tagName('snack-bar-container')).getText() as Promise<
      string
    >;
  }

  // navigateTo() {
  //   // Navigate to the home page of the app
  //   return browser.get('/auth/sign-up');
  // }

  // getHeadingText() {
  //   // Get the home page heading element reference
  //   return element(by.css('app-root h1')).getText();
  // }
}
