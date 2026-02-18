import { ChangeDetectorRef, inject, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { I18nService } from './i18n.service';
import { TTranslationParams, TTranslationPath } from './i18n.types';

/**
 * I18n Pipe Wrapper
 *
 * Custom pipe that wraps the translation functionality to provide
 * a consistent interface across the application.
 */
@Pipe({
  name: 'i18n',
  standalone: true,
  pure: false, // Impure pipe to react to language changes
})
export class I18nPipe implements PipeTransform, OnDestroy {
  private readonly _destroy$: Subject<void> = new Subject<void>();
  private readonly _i18nService: I18nService = inject(I18nService);
  private readonly _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  constructor() {
    // Listen for language changes and trigger change detection
    this._i18nService.langChanges$.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this._cdr.markForCheck();
    });
  }

  public transform(key: TTranslationPath, params?: TTranslationParams, scope?: string): string {
    if (!key) {
      return '';
    }

    return this._i18nService.translate(key, params, scope);
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
