import * as authConstants from './constants';
import * as authModule from './index';
import * as authPages from './pages';
import * as forgotPasswordPage from './pages/forgot-password';
import * as loginPage from './pages/login';
import * as signupPage from './pages/signup';

describe('Auth barrel exports', () => {
  it('exports expected constants through constants barrel', () => {
    expect(authConstants).toHaveProperty('AUTH_FORM_KEYS');
    expect(authConstants).toHaveProperty('LOGIN_CONSTANTS');
    expect(authConstants).toHaveProperty('LOGIN_KEYS');
    expect(authConstants).toHaveProperty('SIGNUP_KEYS');
    expect(authConstants).toHaveProperty('FORGOT_PASSWORD_KEYS');
  });

  it('exports expected pages through page barrels', () => {
    expect(authPages).toHaveProperty('LoginComponent');
    expect(authPages).toHaveProperty('SignupComponent');
    expect(authPages).toHaveProperty('ForgotPasswordComponent');

    expect(loginPage).toHaveProperty('LoginComponent');
    expect(signupPage).toHaveProperty('SignupComponent');
    expect(forgotPasswordPage).toHaveProperty('ForgotPasswordComponent');
  });

  it('exports auth public API from top-level barrel', () => {
    expect(authModule).toHaveProperty('AUTH_FORM_KEYS');
    expect(authModule).toHaveProperty('LoginComponent');
    expect(authModule).toHaveProperty('SignupComponent');
    expect(authModule).toHaveProperty('ForgotPasswordComponent');
  });
});
