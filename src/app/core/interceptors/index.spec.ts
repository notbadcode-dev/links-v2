import * as interceptorIndex from './index';

describe('core/interceptors index', () => {
  it('re-exports interceptors', () => {
    expect(interceptorIndex).toHaveProperty('interceptors');
    expect(Array.isArray(interceptorIndex.interceptors)).toBe(true);
  });
});
