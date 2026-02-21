import { ChangeDetectorRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';

import { I18nDirective } from './i18n.directive';
import { I18nService } from './i18n.service';

interface IContext {
  t: (key: string) => string;
  currentLang: string;
  scope?: string;
}

describe('I18nDirective', () => {
  const createDirective = (
    scope: string | undefined,
    shouldFailLoad = false,
  ): {
    directive: I18nDirective & { i18n: () => string | undefined };
    i18nServiceMock: {
      currentLanguage: string;
      langChanges$: Subject<string>;
      loadTranslations: ReturnType<typeof vi.fn>;
      translate: ReturnType<typeof vi.fn>;
    };
    viewContainerRefMock: ViewContainerRef;
    changeDetectorRefMock: ChangeDetectorRef;
    langChanges$: Subject<string>;
  } => {
    const langChanges$ = new Subject<string>();
    const i18nServiceMock = {
      currentLanguage: 'en',
      langChanges$,
      loadTranslations: vi.fn(() => (shouldFailLoad ? throwError(() => new Error('x')) : of({}))),
      translate: vi.fn((key: string, _params?: unknown, inputScope?: string) =>
        inputScope ? `${inputScope}:${key}` : `global:${key}`,
      ),
    };
    const templateRefMock = {} as TemplateRef<IContext>;
    const viewContainerRefMock = {
      clear: vi.fn(),
      createEmbeddedView: vi.fn(),
    } as unknown as ViewContainerRef;
    const changeDetectorRefMock = { detectChanges: vi.fn() } as ChangeDetectorRef;

    TestBed.configureTestingModule({
      providers: [
        { provide: I18nService, useValue: i18nServiceMock },
        { provide: TemplateRef, useValue: templateRefMock },
        { provide: ViewContainerRef, useValue: viewContainerRefMock },
        { provide: ChangeDetectorRef, useValue: changeDetectorRefMock },
      ],
    });

    const directive = TestBed.runInInjectionContext(() => new I18nDirective()) as I18nDirective & {
      i18n: () => string | undefined;
    };
    directive.i18n = () => scope;

    return {
      directive,
      i18nServiceMock,
      viewContainerRefMock,
      changeDetectorRefMock,
      langChanges$,
    };
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders translation context with scoped and global routing rules', () => {
    const { directive, i18nServiceMock, viewContainerRefMock, changeDetectorRefMock } =
      createDirective('auth');

    (Reflect.get(directive, '_renderTemplate') as () => void).call(directive);

    const context = (viewContainerRefMock.createEmbeddedView as ReturnType<typeof vi.fn>).mock
      .calls[0]?.[1] as IContext;

    expect(context.currentLang).toBe('en');
    expect(context.scope).toBe('auth');
    expect(context.t('auth.title')).toBe('auth:title');
    expect(context.t('common.actions.back')).toBe('global:common.actions.back');
    expect(context.t('navigation.home')).toBe('global:navigation.home');
    expect(context.t('subtitle')).toBe('auth:subtitle');
    expect(i18nServiceMock.translate).toHaveBeenCalled();
    expect(viewContainerRefMock.clear).toHaveBeenCalledTimes(1);
    expect(changeDetectorRefMock.detectChanges).toHaveBeenCalledTimes(1);
  });

  it('renders without scope when it is undefined or blank', () => {
    const undefinedScope = createDirective(undefined);
    (Reflect.get(undefinedScope.directive, '_renderTemplate') as () => void).call(
      undefinedScope.directive,
    );
    const undefinedContext = (
      undefinedScope.viewContainerRefMock.createEmbeddedView as ReturnType<typeof vi.fn>
    ).mock.calls[0]?.[1] as IContext;

    undefinedScope.directive.i18n = () => '  ';
    (Reflect.get(undefinedScope.directive, '_renderTemplate') as () => void).call(
      undefinedScope.directive,
    );
    const blankContext = (
      undefinedScope.viewContainerRefMock.createEmbeddedView as ReturnType<typeof vi.fn>
    ).mock.calls[1]?.[1] as IContext;

    expect(undefinedContext.t('title')).toBe('global:title');
    expect(undefinedContext.scope).toBeUndefined();
    expect(blankContext.t('title')).toBe('global:title');
    expect(blankContext.scope).toBe('  ');
  });

  it('subscribes to language changes and stops after destroy', () => {
    const { directive, i18nServiceMock, langChanges$ } = createDirective('auth');

    directive.ngOnInit();
    expect(i18nServiceMock.loadTranslations).toHaveBeenCalledWith('auth');
    expect(i18nServiceMock.loadTranslations).toHaveBeenCalledTimes(1);

    langChanges$.next('es');
    expect(i18nServiceMock.loadTranslations).toHaveBeenCalledTimes(2);

    directive.ngOnDestroy();
    langChanges$.next('fr');
    expect(i18nServiceMock.loadTranslations).toHaveBeenCalledTimes(2);
  });

  it('renders when load translations emits error', () => {
    const { directive } = createDirective('auth', true);
    const renderSpy = vi.spyOn(directive as never, '_renderTemplate');

    directive.ngOnInit();

    expect(renderSpy).toHaveBeenCalledTimes(1);
  });
});
