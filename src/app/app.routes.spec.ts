import { routes } from './app.routes';

describe('app routes', () => {
  it('has login route and default redirect to login', () => {
    const loginRoute = routes.find((route) => route.path === 'login');
    const redirectRoute = routes.find((route) => route.path === '');

    expect(loginRoute).toBeTruthy();
    expect(loginRoute?.loadComponent).toBeTypeOf('function');
    expect(loginRoute?.data?.['animation']).toBe('login');
    expect(redirectRoute?.redirectTo).toBe('login');
    expect(redirectRoute?.pathMatch).toBe('full');
  });

  it('has dashboard route protected with guard and default child component loader', () => {
    const dashboardRoute = routes.find((route) => route.path === 'dashboard');

    expect(dashboardRoute).toBeTruthy();
    expect(dashboardRoute?.loadComponent).toBeTypeOf('function');
    expect(dashboardRoute?.canActivate?.length).toBeGreaterThan(0);
    expect(dashboardRoute?.canActivateChild?.length).toBeGreaterThan(0);
    expect(dashboardRoute?.data?.['animation']).toBe('dashboard');
    expect(dashboardRoute?.children?.[0]?.path).toBe('');
    expect(dashboardRoute?.children?.[0]?.loadComponent).toBeTypeOf('function');
    expect(dashboardRoute?.children?.[0]?.data?.['animation']).toBe('dashboardHome');
  });
});
