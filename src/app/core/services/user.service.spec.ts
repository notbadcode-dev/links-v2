import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('starts with empty user by default', () => {
    expect(service.email()).toBe('');
    expect(service.user()).toEqual({ email: '' });
  });

  it('stores user email', () => {
    service.setUser({ email: 'john@doe.com' });

    expect(service.email()).toBe('john@doe.com');
    expect(service.user()).toEqual({ email: 'john@doe.com' });
    expect(localStorage.getItem('links_v2.user.email')).toBe('john@doe.com');
  });

  it('clears user data', () => {
    service.setUser({ email: 'john@doe.com' });

    service.clear();

    expect(service.email()).toBe('');
    expect(service.user()).toEqual({ email: '' });
    expect(localStorage.getItem('links_v2.user.email')).toBeNull();
  });
});
