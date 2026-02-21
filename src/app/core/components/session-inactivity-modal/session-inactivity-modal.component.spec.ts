import { TestBed } from '@angular/core/testing';
import { TranslocoService } from '@jsverse/transloco';

import { SessionInactivityModalComponent } from './session-inactivity-modal.component';

describe('SessionInactivityModalComponent', () => {
  const translocoServiceMock = {
    translate: vi.fn((key: string) => `translated:${key}`),
  };
  const createComponent = (): SessionInactivityModalComponent =>
    TestBed.runInInjectionContext(() => new SessionInactivityModalComponent());

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [{ provide: TranslocoService, useValue: translocoServiceMock }],
    });
  });

  it('translates all copy getters', () => {
    const component = createComponent();

    expect(component.title).toBe('translated:common.session.inactivity_modal.title');
    expect(component.description).toBe('translated:common.session.inactivity_modal.description');
    expect(component.autoLogoutWarning).toBe(
      'translated:common.session.inactivity_modal.auto_logout_warning',
    );
    expect(component.confirmLabel).toBe(
      'translated:common.session.inactivity_modal.confirm_button',
    );
    expect(translocoServiceMock.translate).toHaveBeenCalledTimes(4);
  });

  it('emits keepSessionActive when confirm action is triggered', () => {
    const component = createComponent();
    const emitSpy = vi.spyOn(component.keepSessionActive, 'emit');

    component.onKeepSessionActive();

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });
});
