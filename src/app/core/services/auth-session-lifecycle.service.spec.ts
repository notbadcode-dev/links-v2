import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import * as authApi from '@api/auth';

import { ROUTES_CONSTANTS } from '@app/constants/routes.constants';

import { AuthSessionLifecycleService } from './auth-session-lifecycle.service';
import { SessionService } from './session.service';
import { UserService } from './user.service';

describe('AuthSessionLifecycleService', () => {
  const isAuthenticatedSignal = signal(false);
  const refreshTokenSignal = signal('');

  const sessionServiceMock = {
    isAuthenticated: vi.fn(() => isAuthenticatedSignal()),
    refreshToken: vi.fn(() => refreshTokenSignal()),
    setTokens: vi.fn(),
    clear: vi.fn(),
  };

  const userServiceMock = {
    clear: vi.fn(),
  };

  const routerMock = {
    navigate: vi.fn().mockResolvedValue(true),
  };

  const httpClientMock = {} as HttpClient;
  const authApiConfigurationMock: authApi.ApiConfiguration = { rootUrl: 'http://auth-api' };

  const createService = (): AuthSessionLifecycleService =>
    TestBed.inject(AuthSessionLifecycleService);

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();

    isAuthenticatedSignal.set(false);
    refreshTokenSignal.set('');

    TestBed.configureTestingModule({
      providers: [
        { provide: SessionService, useValue: sessionServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: HttpClient, useValue: httpClientMock },
        { provide: authApi.ApiConfiguration, useValue: authApiConfigurationMock },
        { provide: DOCUMENT, useValue: document },
      ],
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('refreshes access and refresh token each hour while authenticated', async () => {
    isAuthenticatedSignal.set(true);
    refreshTokenSignal.set('refresh-token');

    vi.spyOn(authApi, 'authControllerRefresh').mockReturnValue(
      of({
        body: {
          data: {
            accessToken: 'next-access',
            refreshToken: 'next-refresh',
          },
        },
      } as unknown as ReturnType<typeof authApi.authControllerRefresh>),
    );

    const service = createService();
    service.initialize();

    for (let iteration = 0; iteration < 12; iteration += 1) {
      vi.advanceTimersByTime(5 * 60 * 1000);
      document.dispatchEvent(new Event('mousemove'));
    }
    await Promise.resolve();

    expect(authApi.authControllerRefresh).toHaveBeenCalledTimes(1);
    expect(sessionServiceMock.setTokens).toHaveBeenCalledWith('next-access', 'next-refresh');
  });

  it('does not refresh tokens when no authenticated session exists', () => {
    vi.spyOn(authApi, 'authControllerRefresh').mockReturnValue(
      of({ body: { data: { accessToken: 'x', refreshToken: 'y' } } } as unknown as ReturnType<
        typeof authApi.authControllerRefresh
      >),
    );

    const service = createService();
    service.initialize();

    vi.advanceTimersByTime(2 * 60 * 60 * 1000);

    expect(authApi.authControllerRefresh).not.toHaveBeenCalled();
  });

  it('opens inactivity modal after 10 minutes and logs out after 5 additional minutes', () => {
    isAuthenticatedSignal.set(true);
    refreshTokenSignal.set('refresh-token');

    vi.spyOn(authApi, 'authControllerLogout').mockReturnValue(
      of({} as unknown as ReturnType<typeof authApi.authControllerLogout>),
    );
    const clearSpy = vi.spyOn(Storage.prototype, 'clear');

    const service = createService();
    service.initialize();

    vi.advanceTimersByTime(10 * 60 * 1000);
    expect(service.isInactivityPromptOpen()).toBe(true);

    vi.advanceTimersByTime(5 * 60 * 1000);

    expect(service.isInactivityPromptOpen()).toBe(false);
    expect(sessionServiceMock.clear).toHaveBeenCalledTimes(1);
    expect(userServiceMock.clear).toHaveBeenCalledTimes(1);
    expect(clearSpy).toHaveBeenCalledTimes(1);
    expect(routerMock.navigate).toHaveBeenCalledWith([ROUTES_CONSTANTS.AUTH.LOGIN]);
  });

  it('keeps session active when user confirms activity from inactivity modal', () => {
    isAuthenticatedSignal.set(true);
    refreshTokenSignal.set('refresh-token');

    const service = createService();
    service.initialize();

    vi.advanceTimersByTime(10 * 60 * 1000);
    expect(service.isInactivityPromptOpen()).toBe(true);

    service.confirmStillHere();
    expect(service.isInactivityPromptOpen()).toBe(false);

    vi.advanceTimersByTime(5 * 60 * 1000);
    expect(sessionServiceMock.clear).not.toHaveBeenCalled();
  });

  it('logs out locally when refresh endpoint fails', async () => {
    isAuthenticatedSignal.set(true);
    refreshTokenSignal.set('refresh-token');

    vi.spyOn(authApi, 'authControllerRefresh').mockReturnValue(
      throwError(() => new Error('refresh failed')),
    );
    vi.spyOn(authApi, 'authControllerLogout').mockReturnValue(
      of({} as unknown as ReturnType<typeof authApi.authControllerLogout>),
    );

    const service = createService();
    service.initialize();

    vi.advanceTimersByTime(60 * 60 * 1000);
    await Promise.resolve();

    expect(sessionServiceMock.clear).toHaveBeenCalledTimes(1);
    expect(userServiceMock.clear).toHaveBeenCalledTimes(1);
    expect(routerMock.navigate).toHaveBeenCalledWith([ROUTES_CONSTANTS.AUTH.LOGIN]);
  });

  it('does not call API logout when user is already unauthenticated', () => {
    isAuthenticatedSignal.set(false);
    const logoutApiSpy = vi.spyOn(authApi, 'authControllerLogout');

    const service = createService();
    service.logout();

    expect(logoutApiSpy).not.toHaveBeenCalled();
    expect(sessionServiceMock.clear).toHaveBeenCalledTimes(1);
    expect(userServiceMock.clear).toHaveBeenCalledTimes(1);
  });

  it('logs out locally when refresh token is blank', async () => {
    isAuthenticatedSignal.set(true);
    refreshTokenSignal.set('   ');

    const service = createService();
    service.initialize();

    vi.advanceTimersByTime(60 * 60 * 1000);
    await Promise.resolve();

    expect(sessionServiceMock.clear).toHaveBeenCalledTimes(1);
    expect(userServiceMock.clear).toHaveBeenCalledTimes(1);
  });

  it('logs out locally when refresh response has missing tokens', async () => {
    isAuthenticatedSignal.set(true);
    refreshTokenSignal.set('refresh-token');

    vi.spyOn(authApi, 'authControllerRefresh').mockReturnValue(
      of({
        body: {
          data: {
            accessToken: '',
            refreshToken: '',
          },
        },
      } as unknown as ReturnType<typeof authApi.authControllerRefresh>),
    );

    const service = createService();
    service.initialize();

    vi.advanceTimersByTime(60 * 60 * 1000);
    await Promise.resolve();

    expect(sessionServiceMock.clear).toHaveBeenCalledTimes(1);
    expect(userServiceMock.clear).toHaveBeenCalledTimes(1);
  });

  it('is idempotent on initialize and skips confirmStillHere when unauthenticated', () => {
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    const service = createService();

    service.initialize();
    service.initialize();
    service.confirmStillHere();

    expect(addEventListenerSpy).toHaveBeenCalledTimes(5);
    expect(service.isInactivityPromptOpen()).toBe(false);
  });

  it('ignores activity listeners when unauthenticated or when inactivity prompt is open', () => {
    const service = createService();
    service.initialize();

    document.dispatchEvent(new Event('mousemove'));
    expect((service as unknown as { _inactivityTimerId: ReturnType<typeof setTimeout> | null })._inactivityTimerId).toBeNull();

    isAuthenticatedSignal.set(true);
    (service as unknown as { _isInactivityPromptOpen: { set: (value: boolean) => void } })._isInactivityPromptOpen.set(true);
    document.dispatchEvent(new Event('mousemove'));

    expect((service as unknown as { _inactivityTimerId: ReturnType<typeof setTimeout> | null })._inactivityTimerId).toBeNull();
  });

  it('does not open inactivity prompt and timer reset when session is not authenticated', () => {
    const service = createService();

    (service as unknown as { _openInactivityPrompt: () => void })._openInactivityPrompt();
    (service as unknown as { _resetInactivityTimer: () => void })._resetInactivityTimer();

    expect(service.isInactivityPromptOpen()).toBe(false);
    expect((service as unknown as { _inactivityTimerId: ReturnType<typeof setTimeout> | null })._inactivityTimerId).toBeNull();
  });

  it('skips inactivity timer setup while prompt is open', () => {
    isAuthenticatedSignal.set(true);
    const service = createService();

    (service as unknown as { _isInactivityPromptOpen: { set: (value: boolean) => void } })._isInactivityPromptOpen.set(true);
    (service as unknown as { _resetInactivityTimer: () => void })._resetInactivityTimer();

    expect((service as unknown as { _inactivityTimerId: ReturnType<typeof setTimeout> | null })._inactivityTimerId).toBeNull();
  });

  it('returns early on token refresh when a refresh is already in flight', async () => {
    isAuthenticatedSignal.set(true);
    const refreshSpy = vi.spyOn(authApi, 'authControllerRefresh');
    const service = createService();

    (service as unknown as { _isRefreshInFlight: boolean })._isRefreshInFlight = true;
    await (service as unknown as { _refreshTokens: () => Promise<void> })._refreshTokens();

    expect(refreshSpy).not.toHaveBeenCalled();
  });

  it('logs out when refresh response is missing only refresh token', async () => {
    isAuthenticatedSignal.set(true);
    refreshTokenSignal.set('refresh-token');
    vi.spyOn(authApi, 'authControllerRefresh').mockReturnValue(
      of({
        body: {
          data: {
            accessToken: 'access-token',
            refreshToken: '',
          },
        },
      } as unknown as ReturnType<typeof authApi.authControllerRefresh>),
    );

    const service = createService();
    await (service as unknown as { _refreshTokens: () => Promise<void> })._refreshTokens();

    expect(sessionServiceMock.clear).toHaveBeenCalledTimes(1);
    expect(userServiceMock.clear).toHaveBeenCalledTimes(1);
  });

  it('logs out when refresh token is blank using direct refresh invocation', async () => {
    isAuthenticatedSignal.set(true);
    refreshTokenSignal.set('  ');
    const refreshSpy = vi.spyOn(authApi, 'authControllerRefresh');
    const service = createService();

    await (service as unknown as { _refreshTokens: () => Promise<void> })._refreshTokens();

    expect(refreshSpy).not.toHaveBeenCalled();
    expect(sessionServiceMock.clear).toHaveBeenCalledTimes(1);
    expect(userServiceMock.clear).toHaveBeenCalledTimes(1);
  });

  it('logs out when refresh request throws using direct refresh invocation', async () => {
    isAuthenticatedSignal.set(true);
    refreshTokenSignal.set('refresh-token');
    vi.spyOn(authApi, 'authControllerRefresh').mockReturnValue(
      throwError(() => new Error('refresh failed')),
    );

    const service = createService();
    await (service as unknown as { _refreshTokens: () => Promise<void> })._refreshTokens();

    expect(sessionServiceMock.clear).toHaveBeenCalledTimes(1);
    expect(userServiceMock.clear).toHaveBeenCalledTimes(1);
  });
});
