import { LoginRequest, RegisterRequest } from '@api/auth';

import { ILoginForm, ISignupForm } from '../interfaces/auth.interfaces';

export class AuthHelper {
  public static mapLoginFormToEndpoint(formData: ILoginForm): LoginRequest {
    return {
      email: formData.email,
      password: formData.password,
    };
  }

  public static mapSignupFormToEndpoint(formData: ISignupForm): RegisterRequest {
    return {
      email: formData.email,
      password: formData.password,
    };
  }
}
