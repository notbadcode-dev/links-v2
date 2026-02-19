import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DISABLE_ON_LOADING } from '@libs/ui';
import { LoadingService } from '@app/core/services/loading.service';
import { DisableOnLoadingDirective } from './disable-on-loading.directive';

@Component({
  standalone: true,
  imports: [DisableOnLoadingDirective],
  template: `<button disableOnLoading>Submit</button>`,
})
class TestDisableOnLoadingHostComponent {}

describe('DisableOnLoadingDirective', () => {
  it('provides loading signal from LoadingService via DISABLE_ON_LOADING token', () => {
    TestBed.configureTestingModule({
      imports: [TestDisableOnLoadingHostComponent],
    });

    const fixture = TestBed.createComponent(TestDisableOnLoadingHostComponent);
    fixture.detectChanges();

    const loadingService = TestBed.inject(LoadingService);
    const debugEl = fixture.debugElement.query(By.directive(DisableOnLoadingDirective));
    const loadingSignal = debugEl.injector.get(DISABLE_ON_LOADING);

    expect(loadingSignal()).toBe(false);
    loadingService.increment();
    expect(loadingSignal()).toBe(true);
  });
});
