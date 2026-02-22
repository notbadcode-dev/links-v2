import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let darkModeMatches = false;
  const getFaviconHref = (): string => {
    const faviconLink = document.head.querySelector<HTMLLinkElement>('link#app-favicon');
    return faviconLink?.getAttribute('href') ?? '';
  };

  beforeEach(() => {
    localStorage.clear();
    darkModeMatches = false;

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn(() => ({
        get matches() {
          return darkModeMatches;
        },
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    vi.useRealTimers();
    delete document.documentElement.dataset['theme'];
    document.documentElement.style.colorScheme = '';
    document.documentElement.classList.remove('theme-transitioning');
    document.head.querySelector('link#app-favicon')?.remove();
  });

  it('uses system theme only for first visit and stores resolved mode', () => {
    darkModeMatches = true;
    service = TestBed.inject(ThemeService);

    service.initialize();

    expect(service.preference()).toBe('dark');
    expect(service.appliedTheme()).toBe('dark');
    expect(localStorage.getItem('links_v2.theme.preference')).toBe('dark');
    expect(document.documentElement.dataset['theme']).toBe('dark');
    expect(getFaviconHref()).toBe('assets/icons/brand/favicon-dark.svg');
  });

  it('stores explicit selected theme', () => {
    service = TestBed.inject(ThemeService);
    service.initialize();

    service.setTheme('dark');

    expect(service.preference()).toBe('dark');
    expect(localStorage.getItem('links_v2.theme.preference')).toBe('dark');
    expect(document.documentElement.dataset['theme']).toBe('dark');
    expect(getFaviconHref()).toBe('assets/icons/brand/favicon-dark.svg');
  });

  it('uses saved theme preference instead of system theme on next visits', () => {
    localStorage.setItem('links_v2.theme.preference', 'light');
    darkModeMatches = true;

    service = TestBed.inject(ThemeService);
    service.initialize();

    expect(service.preference()).toBe('light');
    expect(service.appliedTheme()).toBe('light');
    expect(localStorage.getItem('links_v2.theme.preference')).toBe('light');
    expect(document.documentElement.dataset['theme']).toBe('light');
  });

  it('applies a temporary class for smooth theme transitions', () => {
    vi.useFakeTimers();
    service = TestBed.inject(ThemeService);
    service.initialize();

    service.setTheme('dark');

    expect(document.documentElement.classList.contains('theme-transitioning')).toBe(true);

    vi.advanceTimersByTime(280);

    expect(document.documentElement.classList.contains('theme-transitioning')).toBe(false);
  });

  it('is idempotent on initialize and toggles theme correctly', () => {
    service = TestBed.inject(ThemeService);
    service.initialize();
    const initialTheme = service.appliedTheme();
    const storedAfterFirstInit = localStorage.getItem('links_v2.theme.preference');

    service.initialize();
    service.toggleTheme();

    const toggledTheme = initialTheme === 'dark' ? 'light' : 'dark';
    expect(localStorage.getItem('links_v2.theme.preference')).not.toBe(storedAfterFirstInit);
    expect(service.appliedTheme()).toBe(toggledTheme);
    expect(service.isDarkTheme()).toBe(toggledTheme === 'dark');
  });

  it('toggles back to light when current applied theme is dark', () => {
    service = TestBed.inject(ThemeService);
    service.initialize();
    service.setTheme('dark');

    service.toggleTheme();

    expect(service.appliedTheme()).toBe('light');
    expect(service.isDarkTheme()).toBe(false);
  });

  it('falls back to system theme when stored preference is invalid', () => {
    localStorage.setItem('links_v2.theme.preference', 'unknown');
    darkModeMatches = true;

    service = TestBed.inject(ThemeService);
    service.initialize();

    expect(service.preference()).toBe('dark');
    expect(service.appliedTheme()).toBe('dark');
  });

  it('resets running transition timer when theme changes rapidly', () => {
    vi.useFakeTimers();
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');
    service = TestBed.inject(ThemeService);
    service.initialize();

    service.setTheme('dark');
    service.setTheme('light');

    expect(clearTimeoutSpy).toHaveBeenCalled();
    vi.advanceTimersByTime(280);
    expect(document.documentElement.classList.contains('theme-transitioning')).toBe(false);
  });

  it('skips DOM updates when document is unavailable', () => {
    service = TestBed.inject(ThemeService);
    const originalDocument = globalThis.document;

    Object.defineProperty(globalThis, 'document', {
      configurable: true,
      value: undefined,
    });

    expect(() => {
      (
        (service as unknown as Record<string, unknown>)['_applyTheme'] as (
          theme: 'light',
          withTransition: boolean,
        ) => void
      )('light', true);
    }).not.toThrow();

    Object.defineProperty(globalThis, 'document', {
      configurable: true,
      value: originalDocument,
    });
  });

  it('falls back to light when window is unavailable', () => {
    service = TestBed.inject(ThemeService);
    const originalWindow = globalThis.window;

    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: undefined,
    });

    expect(
      ((service as unknown as Record<string, unknown>)['_getSystemTheme'] as () => string)(),
    ).toBe('light');

    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: originalWindow,
    });
  });
});
