import { apiErrorMapperInterceptor } from './api-error-mapper.interceptor';
import { authorizationInterceptor } from './authorization.interceptor';
import { languageInterceptor } from './language.interceptor';
import { loadingInterceptor } from './loading.interceptor';

export * from './api-error-mapper.interceptor';
export * from './authorization.interceptor';
export * from './language.interceptor';
export * from './loading.interceptor';

export const interceptors = [
  loadingInterceptor,
  languageInterceptor,
  authorizationInterceptor,
  apiErrorMapperInterceptor,
];
