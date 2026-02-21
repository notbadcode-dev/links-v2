import { appConfig } from './app.config';

describe('appConfig', () => {
  it('exposes application providers', () => {
    expect(appConfig).toBeTruthy();
    expect(Array.isArray(appConfig.providers)).toBe(true);
    expect(appConfig.providers.length).toBeGreaterThan(0);
  });
});
