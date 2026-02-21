export const ROUTES_CONSTANTS = {
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
    FORGOT_PASSWORD: '/forgot-password',
  },
  DASHBOARD: '/dashboard',
} as const;

export const ROUTE_ANIMATIONS = {
  LOGIN: 'login',
  SIGNUP: 'signup',
  FORGOT_PASSWORD: 'forgotPassword',
  DASHBOARD: 'dashboard',
  DASHBOARD_HOME: 'dashboardHome',
} as const;
