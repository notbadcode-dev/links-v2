import { routes } from './app.routes';
import { ROUTE_ANIMATIONS, ROUTES_CONSTANTS } from './constants/routes.constants';

describe('app routes', () => {
  const ROUTE_PATHS = {
    LOGIN: ROUTES_CONSTANTS.AUTH.LOGIN.slice(1),
    SIGNUP: ROUTES_CONSTANTS.AUTH.SIGNUP.slice(1),
    FORGOT_PASSWORD: ROUTES_CONSTANTS.AUTH.FORGOT_PASSWORD.slice(1),
    DASHBOARD: ROUTES_CONSTANTS.DASHBOARD.slice(1),
  } as const;

  it('has login route and default redirect to login', () => {
    const loginRoute = routes.find((route) => route.path === ROUTE_PATHS.LOGIN);
    const redirectRoute = routes.find((route) => route.path === '');

    expect(loginRoute).toBeTruthy();
    expect(loginRoute?.loadComponent).toBeTypeOf('function');
    expect(loginRoute?.data?.['animation']).toBe(ROUTE_ANIMATIONS.LOGIN);
    expect(redirectRoute?.redirectTo).toBe(ROUTE_PATHS.LOGIN);
    expect(redirectRoute?.pathMatch).toBe('full');
  });

  it('loads login component lazily', async () => {
    const loginRoute = routes.find((route) => route.path === ROUTE_PATHS.LOGIN);

    const loginComponent = await loginRoute?.loadComponent?.();

    expect(loginComponent).toBeTruthy();
  });

  it('has dashboard route protected with guard and default child component loader', () => {
    const dashboardRoute = routes.find((route) => route.path === ROUTE_PATHS.DASHBOARD);

    expect(dashboardRoute).toBeTruthy();
    expect(dashboardRoute?.loadComponent).toBeTypeOf('function');
    expect(dashboardRoute?.canActivate?.length).toBeGreaterThan(0);
    expect(dashboardRoute?.canActivateChild?.length).toBeGreaterThan(0);
    expect(dashboardRoute?.data?.['animation']).toBe(ROUTE_ANIMATIONS.DASHBOARD);
    expect(dashboardRoute?.children?.[0]?.path).toBe('');
    expect(dashboardRoute?.children?.[0]?.loadComponent).toBeTypeOf('function');
    expect(dashboardRoute?.children?.[0]?.data?.['animation']).toBe(
      ROUTE_ANIMATIONS.DASHBOARD_HOME,
    );
  });

  it('loads dashboard layout and home child lazily', async () => {
    const dashboardRoute = routes.find((route) => route.path === ROUTE_PATHS.DASHBOARD);

    const layoutComponent = await dashboardRoute?.loadComponent?.();
    const homeComponent = await dashboardRoute?.children?.[0]?.loadComponent?.();

    expect(layoutComponent).toBeTruthy();
    expect(homeComponent).toBeTruthy();
  });

  it('defines signup and forgot-password routes with lazy component loaders', async () => {
    const signupRoute = routes.find((route) => route.path === ROUTE_PATHS.SIGNUP);
    const forgotPasswordRoute = routes.find((route) => route.path === ROUTE_PATHS.FORGOT_PASSWORD);

    expect(signupRoute).toBeTruthy();
    expect(forgotPasswordRoute).toBeTruthy();
    expect(signupRoute?.data?.['animation']).toBe(ROUTE_ANIMATIONS.SIGNUP);
    expect(forgotPasswordRoute?.data?.['animation']).toBe(ROUTE_ANIMATIONS.FORGOT_PASSWORD);

    const signupComponent = await signupRoute?.loadComponent?.();
    const forgotPasswordComponent = await forgotPasswordRoute?.loadComponent?.();

    expect(signupComponent).toBeTruthy();
    expect(forgotPasswordComponent).toBeTruthy();
  });
});
