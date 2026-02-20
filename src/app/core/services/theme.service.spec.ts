import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let darkModeMatches = false;

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
  });

  it('uses system theme only for first visit and stores resolved mode', () => {
    darkModeMatches = true;
    service = TestBed.inject(ThemeService);

    service.initialize();

    expect(service.preference()).toBe('dark');
    expect(service.appliedTheme()).toBe('dark');
    expect(localStorage.getItem('links_v2.theme.preference')).toBe('dark');
    expect(document.documentElement.dataset['theme']).toBe('dark');
  });

  it('stores explicit selected theme', () => {
    service = TestBed.inject(ThemeService);
    service.initialize();

    service.setTheme('dark');

    expect(service.preference()).toBe('dark');
    expect(localStorage.getItem('links_v2.theme.preference')).toBe('dark');
    expect(document.documentElement.dataset['theme']).toBe('dark');
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
});
