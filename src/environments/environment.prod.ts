import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: true,
  authApiUrl: 'https://api.notbadcode.com/auth',
  linksApiUrl: 'https://api.notbadcode.com/links',
  sessionInactivity: {
    refresh: 60 * 60 * 1000,
    inactividad: 10 * 60 * 1000,
    timeout_modal: 5 * 60 * 1000,
  },
};
