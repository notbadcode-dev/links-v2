import { TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  const createComponent = (): DashboardComponent =>
    TestBed.runInInjectionContext(() => new DashboardComponent());

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('creates dashboard component', () => {
    const component = createComponent();

    expect(component).toBeTruthy();
  });
});
