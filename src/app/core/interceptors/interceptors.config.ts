import { languageInterceptor } from './language.interceptor';
import { loadingInterceptor } from './loading.interceptor';

export * from './language.interceptor';
export * from './loading.interceptor';

export const interceptors = [loadingInterceptor, languageInterceptor];
