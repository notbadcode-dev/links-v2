export interface ISessionActivityEnvironment {
  refresh: number;
  inactividad: number;
  timeout_modal: number;
}

export interface IEnvironment {
  production: boolean;
  authApiUrl: string;
  linksApiUrl: string;
  sessionInactivity: ISessionActivityEnvironment;
}
