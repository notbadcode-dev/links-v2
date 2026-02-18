import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, authControllerLogin, LoginResponse } from '@api/auth';
import { ILoginForm } from '../interfaces/auth.interfaces';
import { AuthHelper } from './auth.helper';

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
}
