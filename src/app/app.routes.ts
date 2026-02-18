import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: async () =>
      await import('./features/auth/pages/login').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: async () =>
      await import('./features/auth/pages/signup').then((m) => m.SignupComponent),
  },
  {
    path: 'dashboard',
    loadComponent: async () =>
      await import('./core/layouts/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent,
      ),
    children: [
      {
        path: '',
        loadComponent: async () =>
          await import('./features/dashboard').then((m) => m.DashboardComponent),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
