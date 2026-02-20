import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  ApiConfiguration,
  authControllerLogin,
  authControllerRegister,
  LoginResponse,
} from '@api/auth';

import { AuthHelper } from './auth.helper';
import { ILoginForm, ISignupForm } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpHelper {
  private readonly _http: HttpClient = inject(HttpClient);
  private readonly _apiConfiguration: ApiConfiguration = inject(ApiConfiguration);

  public login(formData: ILoginForm): Observable<LoginResponse> {
    const loginRequest = AuthHelper.mapLoginFormToEndpoint(formData);

    return authControllerLogin(this._http, this._apiConfiguration.rootUrl, {
      body: loginRequest,
    }).pipe(map((response) => response.body.data));
  }

  public register(formData: ISignupForm): Observable<boolean> {
    const registerRequest = AuthHelper.mapSignupFormToEndpoint(formData);

    return authControllerRegister(this._http, this._apiConfiguration.rootUrl, {
      body: registerRequest,
    }).pipe(map((response) => response.body.success));
  }
}
