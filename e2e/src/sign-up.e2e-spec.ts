import { SignUpPage } from './sign-up.po';
import { browser } from 'protractor';
import { environment } from '../../src/environments/environment.test';
const fetch = require('node-fetch');

describe('workspace-project App', () => {
  let page: SignUpPage;
  const prefix = 'sk$**test_';
  console.log(environment.API_URL)

  beforeEach(() => {
    page = new SignUpPage();
  });

  it('should be able to login', () => {
    page.navigateTo();
    page.getUsernameInput().sendKeys(prefix + Math.floor(100000 + Math.random() * 900000));
    page.getPasswordInput().sendKeys('password');
    page.getSubmitButton().click();
    expect(browser.getCurrentUrl()).toMatch('/auth/login') &&
    expect(page.getSnackBarText()).toContain(page.successSignUpMassage);
  });

  afterEach(async () => {
      try {
        const response = await fetch(environment.API_URL + "/auth/users/", {
          'method': 'DELETE'
        })
        console.log('Successfully fetched!')
      }
      catch (err) {
        console.log('Failed to fetch' + err)
      }
  });
});
