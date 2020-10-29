import { FormBuilder } from '@angular/forms';
import { AuthFormComponent } from './auth-form.component';
import { User } from '../../shared/interfaces/user';

describe('AuthFormComponent', () => {
  let component;
  
  beforeEach(() => {
    component = new AuthFormComponent(new FormBuilder)
  });

  //test on input

  it('should create form with 2 controls', (done: DoneFn) => {
    expect(component.form.contains('username')).toBeTrue;
    expect(component.form.contains('password')).toBeTrue;
    done();
  });

  it(`should mark username as invalid if less then 2`, (done: DoneFn) => {
    const username = component.form.get('username')
    expect(username.setValue('a')).toBeTrue;
    done();
  });

  it(`should mark password as invalid if less then 1`, (done: DoneFn) => {
    const password = component.form.get('password')
    expect(password.setValue('')).toBeTrue;
    done();
  });

  it('should submit from by event emmiter', (done: DoneFn) => {
    let result: User;
    const username = component.form.get('username')
    const password = component.form.get('password')
    component.onsubmit.subscribe(x => result = x)
    username.setValue('login')
    password.setValue('password')
    component.submit()
    expect(result).toEqual({username: 'login', password: 'password'})
    done();
  });
});
