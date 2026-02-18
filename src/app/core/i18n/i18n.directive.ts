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
import { Subject, takeUntil } from 'rxjs';
import { I18nService } from './i18n.service';
import { TTranslationParams } from './i18n.types';

/**
 * I18n Directive Wrapper
 *
 * Custom directive that wraps the translation functionality to provide
 * a consistent interface. This directive provides a translation function
 * to the template context.
 */
@Directive({
  selector: '[i18n]',
  standalone: true,
})
export class I18nDirective implements OnInit, OnDestroy {
  public readonly scope: InputSignal<string | undefined> = input<string>();

  private readonly _destroy$: Subject<void> = new Subject<void>();
  private readonly _i18nService: I18nService = inject(I18nService);
  private readonly _templateRef: TemplateRef<II18nTemplateContext> =
    inject<TemplateRef<II18nTemplateContext>>(TemplateRef);
  private readonly _viewContainer: ViewContainerRef = inject(ViewContainerRef);
  private readonly _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  public ngOnInit(): void {
    this._renderTemplate();

    // Re-render when language changes
    this._i18nService.langChanges$.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this._renderTemplate();
    });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _renderTemplate(): void {
    this._viewContainer.clear();

    // Create translation function for template
    const translateFn = (key: string, params?: TTranslationParams): string => {
      return this._i18nService.translate(key, params, this.scope());
    };

    // Create context with translation function
    const context: II18nTemplateContext = {
      $implicit: translateFn,
      t: translateFn, // Alias for shorter syntax
      currentLang: this._i18nService.currentLanguage,
      scope: this.scope(),
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
