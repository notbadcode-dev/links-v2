import {
  ChangeDetectorRef,
  Directive,
  inject,
  input,
  InputSignal,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { startWith, Subject, switchMap, takeUntil } from 'rxjs';
import { I18nService } from './i18n.service';
import { TTranslationParams } from './i18n.types';

@Directive({
  selector: '[i18n]',
  standalone: true,
})
export class I18nDirective implements OnInit, OnDestroy {
  public readonly i18n: InputSignal<string | undefined> = input<string>();

  private readonly _destroy$: Subject<void> = new Subject<void>();
  private readonly _i18nService: I18nService = inject(I18nService);
  private readonly _templateRef: TemplateRef<II18nTemplateContext> =
    inject<TemplateRef<II18nTemplateContext>>(TemplateRef);
  private readonly _viewContainer: ViewContainerRef = inject(ViewContainerRef);
  private readonly _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  public ngOnInit(): void {
    this._i18nService.langChanges$
      .pipe(
        startWith(this._i18nService.currentLanguage),
        switchMap(() => this._i18nService.loadTranslations(this.i18n())),
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: () => {
          this._renderTemplate();
        },
        error: () => {
          this._renderTemplate();
        },
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _renderTemplate(): void {
    this._viewContainer.clear();

    const translateFn = (key: string, params?: TTranslationParams): string => {
      const scope = this.i18n();
      const normalizedScope = scope?.trim();

      if (normalizedScope === undefined || normalizedScope.length === 0) {
        return this._i18nService.translate(key, params);
      }

      if (key.startsWith(`${normalizedScope}.`)) {
        return this._i18nService.translate(
          key.slice(normalizedScope.length + 1),
          params,
          normalizedScope,
        );
      }

      if (key.startsWith('common.') || key.startsWith('navigation.')) {
        return this._i18nService.translate(key, params);
      }

      return this._i18nService.translate(key, params, normalizedScope);
    };

    const scope = this.i18n();
    const context: II18nTemplateContext = {
      $implicit: translateFn,
      t: translateFn,
      currentLang: this._i18nService.currentLanguage,
      ...(scope !== undefined ? { scope } : {}),
    };

    this._viewContainer.createEmbeddedView(this._templateRef, context);
    this._cdr.detectChanges();
  }
}

interface II18nTemplateContext {
  $implicit: (key: string, params?: TTranslationParams) => string;
  t: (key: string, params?: TTranslationParams) => string;
  currentLang: string;
  scope?: string;
}
