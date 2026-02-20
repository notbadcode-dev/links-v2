import { TestBed } from '@angular/core/testing';

import { SessionService } from './session.service';

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });

  it('starts unauthenticated by default', () => {
    expect(service.accessToken()).toBe('');
    expect(service.refreshToken()).toBe('');
    expect(service.isAuthenticated()).toBe(false);
  });

  it('stores and serves response tokens', () => {
    service.setTokens('access-token', 'refresh-token');

    expect(service.accessToken()).toBe('access-token');
    expect(service.refreshToken()).toBe('refresh-token');
    expect(service.isAuthenticated()).toBe(true);
    expect(localStorage.getItem('links_v2.session.accessToken')).toBe('access-token');
    expect(localStorage.getItem('links_v2.session.refreshToken')).toBe('refresh-token');
  });

  it('clears response tokens', () => {
    service.setTokens('access-token', 'refresh-token');

    service.clear();

    expect(service.accessToken()).toBe('');
    expect(service.refreshToken()).toBe('');
    expect(service.isAuthenticated()).toBe(false);
    expect(localStorage.getItem('links_v2.session.accessToken')).toBeNull();
    expect(localStorage.getItem('links_v2.session.refreshToken')).toBeNull();
  });
});
