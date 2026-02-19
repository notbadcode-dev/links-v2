import { TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  const createComponent = (): DashboardComponent =>
    TestBed.runInInjectionContext(() => new DashboardComponent());

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('builds dashboard categories tree', () => {
    const component = createComponent();

    expect(component.categories.length).toBeGreaterThan(0);
    expect(component.categories[0]?.children?.length).toBeGreaterThan(0);
  });

  it('handles onCategorySelect without throwing', () => {
    const component = createComponent();

    expect(() => component.onCategorySelect({ id: '1', label: 'Test' })).not.toThrow();
  });
});
