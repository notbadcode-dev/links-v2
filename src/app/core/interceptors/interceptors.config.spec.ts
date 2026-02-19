import {
  apiErrorMapperInterceptor,
  interceptors,
  languageInterceptor,
  loadingInterceptor,
} from './interceptors.config';

describe('interceptors config', () => {
  it('exports interceptors in expected order', () => {
    expect(interceptors).toEqual([
      loadingInterceptor,
      languageInterceptor,
      apiErrorMapperInterceptor,
    ]);
  });
});
