import { AuthHelper } from './auth.helper';

describe('AuthHelper', () => {
  it('maps login form to endpoint payload', () => {
    const payload = AuthHelper.mapLoginFormToEndpoint({
      email: 'john@doe.com',
      password: 'secret123',
      rememberMe: true,
    });

    expect(payload).toEqual({
      email: 'john@doe.com',
      password: 'secret123',
    });
  });
});
