import { TestBed } from '@angular/core/testing';

import { I18nService } from '@app/core/i18n';
import { ThemeService } from '@app/core/services/theme.service';

import { ThemeToggleComponent } from './theme-toggle.component';

describe('ThemeToggleComponent', () => {
  const themeServiceMock = {
    isDarkTheme: vi.fn(() => false),
    toggleTheme: vi.fn(),
  };

  const i18nMock = {
    translate: vi.fn((key: string) => key),
  };

  const createComponent = (): ThemeToggleComponent =>
    TestBed.runInInjectionContext(() => new ThemeToggleComponent());

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [
        { provide: ThemeService, useValue: themeServiceMock },
        { provide: I18nService, useValue: i18nMock },
      ],
    });
  });

  it('toggles theme when requested', () => {
    const component = createComponent();

    component.toggleTheme();

    expect(themeServiceMock.toggleTheme).toHaveBeenCalledTimes(1);
  });

  it('reports light mode as active when theme is not dark', () => {
    const component = createComponent();

    expect(component.isLightThemeActive()).toBe(true);
  });

  it('reports dark mode as active when theme is dark', () => {
    themeServiceMock.isDarkTheme.mockReturnValue(true);
    const component = createComponent();

    expect(component.isDarkThemeActive()).toBe(true);
    expect(component.isLightThemeActive()).toBe(false);
  });

  it('returns dark label when dark theme is active', () => {
    themeServiceMock.isDarkTheme.mockReturnValue(true);
    const component = createComponent();

    expect(component.getToggleLabel()).toBe('common.theme.dark');
  });

  it('returns light label when dark theme is not active', () => {
    themeServiceMock.isDarkTheme.mockReturnValue(false);
    const component = createComponent();

    expect(component.getToggleLabel()).toBe('common.theme.light');
  });
});
