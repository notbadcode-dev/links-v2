import { LoginRequest } from '@api/auth';
import { ILoginForm } from '../interfaces/auth.interfaces';

export class AuthHelper {
  public static mapLoginFormToEndpoint(formData: ILoginForm): LoginRequest {
    return {
      email: formData.email,
      password: formData.password,
    };
  }
}
