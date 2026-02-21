import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: false,
  authApiUrl: 'http://localhost:60200',
  linksApiUrl: 'http://localhost:60201',
  sessionInactivity: {
    refresh: 60 * 60 * 1000,
    inactividad: 10 * 60 * 1000,
    timeout_modal: 5 * 60 * 1000,
  },
};
