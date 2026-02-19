import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, of, Subject } from 'rxjs';

import { I18nDirective } from './i18n.directive';
import { I18nService } from './i18n.service';

@Component({
  standalone: true,
  imports: [I18nDirective],
  template: `
    <ng-container *i18n="'auth'; let t">
      <span class="scoped">{{ t('title') }}</span>
      <span class="common">{{ t('common.actions.back') }}</span>
      <span class="plain">{{ t('subtitle') }}</span>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestI18nDirectiveHostComponent {}

describe('I18nDirective', () => {
  const langChanges$ = new Subject<string>();

  const i18nMock = {
    currentLanguage: 'en',
    langChanges$: langChanges$.asObservable() as Observable<string>,
    loadTranslations: vi.fn((_scope?: string) => of({})),
    translate: vi.fn((key: string, _params?: unknown, scope?: string) =>
      scope ? `${scope}:${key}` : `global:${key}`,
    ),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      imports: [TestI18nDirectiveHostComponent],
      providers: [{ provide: I18nService, useValue: i18nMock }],
    });
  });

  it('renders with scoped and global translation rules', () => {
    const fixture = TestBed.createComponent(TestI18nDirectiveHostComponent);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const scoped = host.querySelector('.scoped')?.textContent?.trim();
    const common = host.querySelector('.common')?.textContent?.trim();
    const plain = host.querySelector('.plain')?.textContent?.trim();

    expect(i18nMock.loadTranslations).toHaveBeenCalledWith(undefined);
    expect(scoped).toBe('global:title');
    expect(common).toBe('global:common.actions.back');
    expect(plain).toBe('global:subtitle');
  });

  it('reloads translations on language changes', () => {
    const fixture = TestBed.createComponent(TestI18nDirectiveHostComponent);
    fixture.detectChanges();

    langChanges$.next('es');
    fixture.detectChanges();

    expect(i18nMock.loadTranslations).toHaveBeenCalledTimes(2);
    expect(i18nMock.loadTranslations).toHaveBeenNthCalledWith(2, undefined);
  });
});
