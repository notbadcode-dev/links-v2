import * as dashboardIndex from './index';

describe('features/dashboard index', () => {
  it('re-exports DashboardComponent', () => {
    expect(dashboardIndex).toHaveProperty('DashboardComponent');
  });
});
