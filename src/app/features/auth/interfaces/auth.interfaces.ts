export interface ILoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ISignupForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IForgotPasswordForm {
  email: string;
}
