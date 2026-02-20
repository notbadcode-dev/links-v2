import { Routes } from '@angular/router';

import { authGuard } from '@app/core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: async () =>
      await import('./features/auth/pages/login').then((m) => m.LoginComponent),
    data: { animation: 'login' },
  },
  {
    path: 'signup',
    loadComponent: async () =>
      await import('./features/auth/pages/signup').then((m) => m.SignupComponent),
    data: { animation: 'signup' },
  },
  {
    path: 'dashboard',
    loadComponent: async () =>
      await import('./core/layouts/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent,
      ),
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    data: { animation: 'dashboard' },
    children: [
      {
        path: '',
        loadComponent: async () =>
          await import('./features/dashboard').then((m) => m.DashboardComponent),
        data: { animation: 'dashboardHome' },
      },
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
