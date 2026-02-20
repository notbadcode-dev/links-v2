import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';

type TThemeMode = 'light' | 'dark';

const THEME_STORAGE_KEY = 'links_v2.theme.preference';
const DARK_MODE_MEDIA_QUERY = '(prefers-color-scheme: dark)';
const THEME_TRANSITION_CLASS = 'theme-transitioning';
const THEME_TRANSITION_DURATION_MS = 280;

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public readonly preference: Signal<TThemeMode> = computed(() => this._preference());
  public readonly appliedTheme: Signal<TThemeMode> = computed(() => this._appliedTheme());
  public readonly isDarkTheme: Signal<boolean> = computed(() => this._appliedTheme() === 'dark');

  private readonly _preference: WritableSignal<TThemeMode> = signal<TThemeMode>(
    this._getInitialTheme(),
  );
  private readonly _appliedTheme: WritableSignal<TThemeMode> = signal<TThemeMode>('light');
  private _isInitialized: boolean = false;
  private _themeTransitionTimeoutId: number | null = null;

  public initialize(): void {
    if (this._isInitialized) {
      return;
    }

    this._isInitialized = true;
    this._applyTheme(this._preference(), false);
    localStorage.setItem(THEME_STORAGE_KEY, this._preference());
  }

  public setTheme(theme: TThemeMode): void {
    this._setPreference(theme);
  }

  public toggleTheme(): void {
    const nextTheme: TThemeMode = this._appliedTheme() === 'dark' ? 'light' : 'dark';
    this._setPreference(nextTheme);
  }

  private _setPreference(preference: TThemeMode): void {
    this._preference.set(preference);
    localStorage.setItem(THEME_STORAGE_KEY, preference);
    this._applyTheme(preference, true);
  }

  private _applyTheme(theme: TThemeMode, withTransition: boolean): void {
    this._appliedTheme.set(theme);

    if (typeof document === 'undefined') {
      return;
    }

    if (withTransition) {
      this._enableThemeTransition();
    }

    document.documentElement.dataset['theme'] = theme;
    document.documentElement.style.colorScheme = theme;
  }

  private _enableThemeTransition(): void {
    const rootElement = document.documentElement;

    if (this._themeTransitionTimeoutId !== null) {
      window.clearTimeout(this._themeTransitionTimeoutId);
      this._themeTransitionTimeoutId = null;
    }

    rootElement.classList.add(THEME_TRANSITION_CLASS);
    this._themeTransitionTimeoutId = window.setTimeout(() => {
      rootElement.classList.remove(THEME_TRANSITION_CLASS);
      this._themeTransitionTimeoutId = null;
    }, THEME_TRANSITION_DURATION_MS);
  }

  private _getInitialTheme(): TThemeMode {
    const storedPreference = localStorage.getItem(THEME_STORAGE_KEY);

    if (storedPreference === 'light' || storedPreference === 'dark') {
      return storedPreference;
    }

    return this._getSystemTheme();
  }

  private _getSystemTheme(): TThemeMode {
    if (typeof window === 'undefined') {
      return 'light';
    }

    return window.matchMedia(DARK_MODE_MEDIA_QUERY).matches ? 'dark' : 'light';
  }
}
