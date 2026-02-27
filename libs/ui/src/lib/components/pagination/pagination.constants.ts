import { IPaginationConfig } from './pagination.types';

export const PAGINATION_CONSTANTS = {
  ROOT_CLASS: 'ui-pagination',
  SCROLL_CLASS: 'ui-pagination--scroll',
  ACTIVE_PAGE_CLASS: 'ui-pagination-page--active',
  NAV_BUTTON_CLASS: 'ui-pagination-nav-btn',
} as const;

export const PAGINATION_DEFAULT_CONFIG: Required<IPaginationConfig> = {
  showBoundaryButtons: true,
  showStepButtons: true,
  scrollMode: false,
  hideNavigationButtonsInScroll: true,
  ariaLabel: 'Pagination',
  customClass: '',
};
