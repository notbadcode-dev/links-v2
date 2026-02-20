import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';

interface ISessionState {
  accessToken: string;
  refreshToken: string;
}

const SESSION_STORAGE_KEYS = {
  ACCESS_TOKEN: 'links_v2.session.accessToken',
  REFRESH_TOKEN: 'links_v2.session.refreshToken',
} as const;

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  public readonly accessToken: Signal<string> = computed(() => this._state().accessToken);
  public readonly refreshToken: Signal<string> = computed(() => this._state().refreshToken);
  public readonly isAuthenticated: Signal<boolean> = computed(
    () => Boolean(this._state().accessToken) && Boolean(this._state().refreshToken),
  );

  private readonly _state: WritableSignal<ISessionState> = signal<ISessionState>(
    this._getInitialState(),
  );

  public setTokens(accessToken: string, refreshToken: string): void {
    const normalizedAccessToken = accessToken.trim();
    const normalizedRefreshToken = refreshToken.trim();

    this._state.set({
      accessToken: normalizedAccessToken,
      refreshToken: normalizedRefreshToken,
    });

    localStorage.setItem(SESSION_STORAGE_KEYS.ACCESS_TOKEN, normalizedAccessToken);
    localStorage.setItem(SESSION_STORAGE_KEYS.REFRESH_TOKEN, normalizedRefreshToken);
  }

  public clear(): void {
    this._state.set({
      accessToken: '',
      refreshToken: '',
    });
    localStorage.removeItem(SESSION_STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(SESSION_STORAGE_KEYS.REFRESH_TOKEN);
  }

  private _getInitialState(): ISessionState {
    const accessToken = localStorage.getItem(SESSION_STORAGE_KEYS.ACCESS_TOKEN) ?? '';
    const refreshToken = localStorage.getItem(SESSION_STORAGE_KEYS.REFRESH_TOKEN) ?? '';

    return {
      accessToken,
      refreshToken,
    };
  }
}
