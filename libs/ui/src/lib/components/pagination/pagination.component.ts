import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Signal,
} from '@angular/core';

import { BaseDirective } from '@libs/directives';
import { EButtonWrapperColor, EButtonWrapperVariant } from '@libs/enums';
import { ButtonWrapperComponent } from '@libs/wrappers';

import { PAGINATION_CONSTANTS, PAGINATION_DEFAULT_CONFIG } from './pagination.constants';
import { IPaginationConfig } from './pagination.types';

@Component({
  selector: 'ui-pagination',
  standalone: true,
  imports: [CommonModule, ButtonWrapperComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent extends BaseDirective {
  public readonly totalPages: InputSignal<number> = input.required<number>();
  public readonly currentPage: InputSignal<number> = input.required<number>();
  public readonly config: InputSignal<IPaginationConfig | undefined> = input<IPaginationConfig>();

  public readonly pageChange: OutputEmitterRef<number> = output<number>();

  public readonly effectiveConfig: Signal<Required<IPaginationConfig>> = computed(() => ({
    ...PAGINATION_DEFAULT_CONFIG,
    ...(this.config() ?? {}),
  }));

  public readonly normalizedTotalPages: Signal<number> = computed(() =>
    Math.max(1, Math.trunc(this.totalPages())),
  );

  public readonly normalizedCurrentPage: Signal<number> = computed(() =>
    this._clamp(this.currentPage(), 1, this.normalizedTotalPages()),
  );

  public readonly visiblePages: Signal<number[]> = computed(() => {
    const totalPages = this.normalizedTotalPages();
    const currentPage = this.normalizedCurrentPage();

    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 1) {
      return [1, 2, 3];
    }

    if (currentPage >= totalPages) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }

    return [currentPage - 1, currentPage, currentPage + 1];
  });

  public readonly isFirstPage: Signal<boolean> = computed(() => this.normalizedCurrentPage() <= 1);
  public readonly isLastPage: Signal<boolean> = computed(
    () => this.normalizedCurrentPage() >= this.normalizedTotalPages(),
  );

  public readonly showBoundaryButtons: Signal<boolean> = computed(
    () => this.effectiveConfig().showBoundaryButtons && !this._hideNavigationButtons(),
  );

  public readonly showStepButtons: Signal<boolean> = computed(
    () => this.effectiveConfig().showStepButtons && !this._hideNavigationButtons(),
  );
  public readonly pageVariant: Signal<EButtonWrapperVariant> = computed(() =>
    this.effectiveConfig().scrollMode ? EButtonWrapperVariant.BASIC : EButtonWrapperVariant.STROKED,
  );
  public readonly navigationVariant: EButtonWrapperVariant = EButtonWrapperVariant.BASIC;
  public readonly buttonColor: EButtonWrapperColor = EButtonWrapperColor.PRIMARY;
  public readonly EButtonWrapperVariant: typeof EButtonWrapperVariant = EButtonWrapperVariant;
  public readonly EButtonWrapperColor: typeof EButtonWrapperColor = EButtonWrapperColor;

  public readonly rootClass: Signal<string> = computed(() => {
    const classes: string[] = [PAGINATION_CONSTANTS.ROOT_CLASS];
    const config = this.effectiveConfig();

    if (config.scrollMode) {
      classes.push(PAGINATION_CONSTANTS.SCROLL_CLASS);
    }

    if (config.customClass.trim().length > 0) {
      classes.push(config.customClass.trim());
    }

    return classes.join(' ');
  });

  public selectPage(page: number): void {
    const normalizedPage = this._clamp(page, 1, this.normalizedTotalPages());
    if (normalizedPage === this.normalizedCurrentPage()) {
      return;
    }

    this.pageChange.emit(normalizedPage);
  }

  public goToFirstPage(): void {
    if (this.isFirstPage()) {
      return;
    }

    this.pageChange.emit(1);
  }

  public goToPreviousPage(): void {
    if (this.isFirstPage()) {
      return;
    }

    this.pageChange.emit(this.normalizedCurrentPage() - 1);
  }

  public goToNextPage(): void {
    if (this.isLastPage()) {
      return;
    }

    this.pageChange.emit(this.normalizedCurrentPage() + 1);
  }

  public goToLastPage(): void {
    if (this.isLastPage()) {
      return;
    }

    this.pageChange.emit(this.normalizedTotalPages());
  }

  public isActivePage(page: number): boolean {
    return page === this.normalizedCurrentPage();
  }

  private _hideNavigationButtons(): boolean {
    const config = this.effectiveConfig();
    return config.scrollMode && config.hideNavigationButtonsInScroll;
  }

  private _clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, Math.trunc(value)));
  }
}
