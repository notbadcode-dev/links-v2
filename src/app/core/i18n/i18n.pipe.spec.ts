import { ChangeDetectorRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { I18nPipe } from './i18n.pipe';
import { I18nService } from './i18n.service';

describe('I18nPipe', () => {
  const langChanges$ = new Subject<string>();
  const cdrMock = {
    markForCheck: vi.fn(),
  };

  const i18nMock = {
    langChanges$: langChanges$.asObservable(),
    translate: vi.fn((key: string) => `t:${key}`),
  };

  const createPipe = (): I18nPipe => TestBed.runInInjectionContext(() => new I18nPipe());

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [
        { provide: I18nService, useValue: i18nMock },
        { provide: ChangeDetectorRef, useValue: cdrMock },
      ],
    });
  });

  it('translates non-empty key and returns empty string for empty key', () => {
    const pipe = createPipe();

    expect(pipe.transform('common.validation.required')).toBe('t:common.validation.required');
    expect(pipe.transform('')).toBe('');
  });

  it('marks for check on language changes', () => {
    const pipe = createPipe();
    const callsBefore: number = cdrMock.markForCheck.mock.calls.length as number;

    langChanges$.next('es');
    pipe.ngOnDestroy();

    expect(cdrMock.markForCheck.mock.calls.length).toBeGreaterThan(callsBefore);
  });
});
