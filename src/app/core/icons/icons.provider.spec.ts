import { CUSTOM_ICONS_CONSTANTS } from './icons.constants';
import { provideCustomIcons } from './icons.provider';

describe('provideCustomIcons', () => {
  it('returns an APP_INITIALIZER provider that registers custom icons', () => {
    const addSvgIcon = vi.fn();
    const iconRegistryMock = {
      addSvgIcon,
    };
    const sanitizerMock = {
      bypassSecurityTrustResourceUrl: vi.fn((url: string) => `safe:${url}`),
    };

    const provider = provideCustomIcons() as {
      provide: unknown;
      multi: boolean;
      deps: unknown[];
      useFactory: (
        registry: typeof iconRegistryMock,
        sanitizer: typeof sanitizerMock,
      ) => () => void;
    };

    expect(provider.multi).toBe(true);
    expect(typeof provider.useFactory).toBe('function');

    const initializer = provider.useFactory(iconRegistryMock, sanitizerMock);
    initializer();

    expect(addSvgIcon).toHaveBeenCalled();
    expect(addSvgIcon).toHaveBeenCalledWith(
      CUSTOM_ICONS_CONSTANTS.AUTH.LOGIN_BUTTON,
      'safe:assets/icons/auth/login-enter-animated.svg',
    );
    expect(addSvgIcon).toHaveBeenCalledWith(
      CUSTOM_ICONS_CONSTANTS.APP.BOOKMARK_OUTLINE_ANIMATED_S,
      'safe:assets/icons/brand/bookmark_outline_animated_S.svg',
    );
    expect(addSvgIcon).toHaveBeenCalledWith(
      CUSTOM_ICONS_CONSTANTS.MATERIAL.FLIGHT,
      'safe:assets/icons/material/flight.svg',
    );
    expect(addSvgIcon.mock.calls.length).toBeGreaterThanOrEqual(30);
  });
});
