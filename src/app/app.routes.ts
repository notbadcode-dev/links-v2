import { Routes } from '@angular/router';

import { ROUTE_ANIMATIONS, ROUTES_CONSTANTS } from '@app/constants/routes.constants';
import { authGuard } from '@app/core/guards/auth.guard';

const ROUTE_PATHS = {
  LOGIN: ROUTES_CONSTANTS.AUTH.LOGIN.slice(1),
  SIGNUP: ROUTES_CONSTANTS.AUTH.SIGNUP.slice(1),
  FORGOT_PASSWORD: ROUTES_CONSTANTS.AUTH.FORGOT_PASSWORD.slice(1),
  DASHBOARD: ROUTES_CONSTANTS.DASHBOARD.slice(1),
} as const;

export const routes: Routes = [
  {
    path: ROUTE_PATHS.LOGIN,
    loadComponent: async () =>
      await import('./features/auth/pages/login').then((m) => m.LoginComponent),
    data: { animation: ROUTE_ANIMATIONS.LOGIN },
  },
  {
    path: ROUTE_PATHS.SIGNUP,
    loadComponent: async () =>
      await import('./features/auth/pages/signup').then((m) => m.SignupComponent),
    data: { animation: ROUTE_ANIMATIONS.SIGNUP },
  },
  {
    path: ROUTE_PATHS.FORGOT_PASSWORD,
    loadComponent: async () =>
      await import('./features/auth/pages/forgot-password').then((m) => m.ForgotPasswordComponent),
    data: { animation: ROUTE_ANIMATIONS.FORGOT_PASSWORD },
  },
  {
    path: ROUTE_PATHS.DASHBOARD,
    loadComponent: async () =>
      await import('./core/layouts/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent,
      ),
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    data: { animation: ROUTE_ANIMATIONS.DASHBOARD },
    children: [
      {
        path: '',
        loadComponent: async () =>
          await import('./features/dashboard').then((m) => m.DashboardComponent),
        data: { animation: ROUTE_ANIMATIONS.DASHBOARD_HOME },
      },
    ],
  },
  {
    path: '',
    redirectTo: ROUTE_PATHS.LOGIN,
    pathMatch: 'full',
  },
];
