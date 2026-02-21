import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, Injector, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

import * as authApi from '@api/auth';

import { ROUTES_CONSTANTS } from '@app/constants/routes.constants';

import { SessionService } from './session.service';
import { UserService } from './user.service';

const SESSION_INACTIVITY = environment.sessionInactivity;

const ACTIVITY_EVENTS: readonly (keyof DocumentEventMap)[] = [
  'click',
  'keydown',
  'mousemove',
  'scroll',
  'touchstart',
];

@Injectable({
  providedIn: 'root',
})
export class AuthSessionLifecycleService {
  private readonly _sessionService: SessionService = inject(SessionService);
  private readonly _userService: UserService = inject(UserService);
  private readonly _router: Router = inject(Router);
  private readonly _http: HttpClient = inject(HttpClient);
  private readonly _authApiConfiguration: authApi.ApiConfiguration = inject(
    authApi.ApiConfiguration,
  );
  private readonly _document: Document = inject(DOCUMENT);
  private readonly _injector: Injector = inject(Injector);

  private readonly _isInactivityPromptOpen: WritableSignal<boolean> = signal(false);

  private _refreshIntervalId: ReturnType<typeof setInterval> | null = null;
  private _inactivityTimerId: ReturnType<typeof setTimeout> | null = null;
  private _autoLogoutTimerId: ReturnType<typeof setTimeout> | null = null;
  private _isInitialized: boolean = false;
  private _isRefreshInFlight: boolean = false;

  constructor() {
    effect(
      () => {
        if (this._sessionService.isAuthenticated()) {
          this._startRefreshInterval();
          this._resetInactivityTimer();
          return;
        }

        this._stopRefreshInterval();
        this._resetInactivityState();
      },
      { injector: this._injector },
    );
  }

  public isInactivityPromptOpen(): boolean {
    return this._isInactivityPromptOpen();
  }

  public initialize(): void {
    if (this._isInitialized) {
      return;
    }

    this._isInitialized = true;
    this._bindActivityListeners();
  }

  public confirmStillHere(): void {
    if (!this._sessionService.isAuthenticated()) {
      return;
    }

    this._closeInactivityPrompt();
    this._resetInactivityTimer();
  }

  public logout(): void {
    if (this._sessionService.isAuthenticated()) {
      void this._sendLogoutRequest();
    }

    this._performClientLogout();
  }

  private _startRefreshInterval(): void {
    if (this._refreshIntervalId) {
      return;
    }

    this._refreshIntervalId = setInterval(() => {
      void this._refreshTokens();
    }, SESSION_INACTIVITY.refresh);
  }

  private _stopRefreshInterval(): void {
    if (!this._refreshIntervalId) {
      return;
    }

    clearInterval(this._refreshIntervalId);
    this._refreshIntervalId = null;
  }

  private _resetInactivityTimer(): void {
    this._clearInactivityTimer();

    if (!this._sessionService.isAuthenticated() || this._isInactivityPromptOpen()) {
      return;
    }

    this._inactivityTimerId = setTimeout(() => {
      this._openInactivityPrompt();
    }, SESSION_INACTIVITY.inactividad);
  }

  private _clearInactivityTimer(): void {
    if (!this._inactivityTimerId) {
      return;
    }

    clearTimeout(this._inactivityTimerId);
    this._inactivityTimerId = null;
  }

  private _openInactivityPrompt(): void {
    if (!this._sessionService.isAuthenticated()) {
      return;
    }

    this._isInactivityPromptOpen.set(true);
    this._clearAutoLogoutTimer();
    this._autoLogoutTimerId = setTimeout(() => {
      this._isInactivityPromptOpen.set(false);
      this.logout();
    }, SESSION_INACTIVITY.timeout_modal);
  }

  private _closeInactivityPrompt(): void {
    this._isInactivityPromptOpen.set(false);
    this._clearAutoLogoutTimer();
  }

  private _clearAutoLogoutTimer(): void {
    if (!this._autoLogoutTimerId) {
      return;
    }

    clearTimeout(this._autoLogoutTimerId);
    this._autoLogoutTimerId = null;
  }

  private _resetInactivityState(): void {
    this._closeInactivityPrompt();
    this._clearInactivityTimer();
  }

  private _onUserActivity(): void {
    if (!this._sessionService.isAuthenticated()) {
      return;
    }

    if (this._isInactivityPromptOpen()) {
      return;
    }

    this._resetInactivityTimer();
  }

  private _bindActivityListeners(): void {
    ACTIVITY_EVENTS.forEach((eventName) => {
      this._document.addEventListener(
        eventName,
        () => {
          this._onUserActivity();
        },
        { passive: true },
      );
    });
  }

  private async _refreshTokens(): Promise<void> {
    if (this._isRefreshInFlight || !this._sessionService.isAuthenticated()) {
      return;
    }

    const refreshToken = this._sessionService.refreshToken().trim();
    if (!refreshToken) {
      this._performClientLogout();
      return;
    }

    this._isRefreshInFlight = true;

    try {
      const response = await firstValueFrom(
        authApi.authControllerRefresh(this._http, this._authApiConfiguration.rootUrl, {
          body: { refreshToken },
        }),
      );
      const tokens = response.body.data;

      if (!tokens.accessToken || !tokens.refreshToken) {
        this._performClientLogout();
        return;
      }

      this._sessionService.setTokens(tokens.accessToken, tokens.refreshToken);
    } catch {
      this._performClientLogout();
    } finally {
      this._isRefreshInFlight = false;
    }
  }

  private async _sendLogoutRequest(): Promise<void> {
    try {
      await firstValueFrom(
        authApi.authControllerLogout(this._http, this._authApiConfiguration.rootUrl),
      );
    } catch {
      // Best-effort call: client logout must continue even if API logout fails.
    }
  }

  private _performClientLogout(): void {
    this._stopRefreshInterval();
    this._resetInactivityState();

    this._sessionService.clear();
    this._userService.clear();
    localStorage.clear();

    void this._router.navigate([ROUTES_CONSTANTS.AUTH.LOGIN]);
  }
}
