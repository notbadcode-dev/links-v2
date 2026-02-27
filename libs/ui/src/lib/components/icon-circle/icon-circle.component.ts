import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';

import {
  ButtonWrapperComponent,
  DropdownWrapperComponent,
  EButtonWrapperContentMode,
  EButtonWrapperVariant,
  IconWrapperComponent,
} from '@libs/wrappers';

import {
  EMenuSurfaceLayout,
  MenuSurfaceComponent,
  UiMenuOptionDirective,
} from '../menu-surface/menu-surface.component';

const ICON_CIRCLE_DEFAULT_ICONS: readonly string[] = [
  'auth-login-button',
  'auth-logout-button',
  'auth-user-sidebar',
  'auth-email-input',
  'auth-password-input',
  'theme-toggle-animated',
  'brand-bookmark-animated',
  'brand-bookmark-outline-animated',
  'brand-bookmark-animated-s',
  'brand-bookmark-outline-animated-s',
  'auth-login-button',
  'auth-logout-button',
  'auth-user-sidebar',
  'auth-email-input',
  'auth-password-input',
  'theme-toggle-animated',
  'brand-bookmark-animated',
  'brand-bookmark-outline-animated',
  'brand-bookmark-animated-s',
  'brand-bookmark-outline-animated-s',
  'auth-login-button',
  'auth-logout-button',
  'auth-user-sidebar',
  'auth-email-input',
  'auth-password-input',
];

@Component({
  selector: 'ui-icon-circle',
  standalone: true,
  imports: [
    DropdownWrapperComponent,
    IconWrapperComponent,
    ButtonWrapperComponent,
    MenuSurfaceComponent,
    UiMenuOptionDirective,
  ],
  templateUrl: './icon-circle.component.html',
  styleUrl: './icon-circle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconCircleComponent {
  public readonly EMenuSurfaceLayout: typeof EMenuSurfaceLayout = EMenuSurfaceLayout;
  public readonly EButtonWrapperContentMode: typeof EButtonWrapperContentMode =
    EButtonWrapperContentMode;
  public readonly EButtonWrapperVariant: typeof EButtonWrapperVariant = EButtonWrapperVariant;

  public readonly selectedIcon: InputSignal<string | undefined> = input<string | undefined>(
    undefined,
  );
  public readonly icons: InputSignal<readonly string[]> =
    input<readonly string[]>(ICON_CIRCLE_DEFAULT_ICONS);
  public readonly iconColor: InputSignal<string> = input<string>('var(--ui-color-text-default)');
  public readonly tooltip: InputSignal<string> = input<string>('Select icon');
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  public readonly selectedIconChange: OutputEmitterRef<string> = output<string>();
  public readonly iconSelected: OutputEmitterRef<string> = output<string>();

  public readonly availableIcons: Signal<readonly string[]> = computed<readonly string[]>(() =>
    this.icons()
      .map((icon) => icon.trim())
      .filter((icon) => icon.length > 0),
  );

  public readonly effectiveSelectedIcon: Signal<string | undefined> = computed<string | undefined>(
    () => {
      const selectedIcon = this._currentSelectedIcon();
      return selectedIcon.length > 0 ? selectedIcon : undefined;
    },
  );

  private readonly _currentSelectedIcon: WritableSignal<string> = signal('');

  constructor() {
    effect(() => {
      const availableIcons = this.availableIcons();
      const preferredIcon = this.selectedIcon()?.trim() ?? '';
      const nextIcon =
        availableIcons.find((icon) => icon === preferredIcon) ?? availableIcons[0] ?? preferredIcon;

      if (nextIcon !== this._currentSelectedIcon()) {
        this._currentSelectedIcon.set(nextIcon);
      }
    });
  }

  public onSelectIcon(icon: string): void {
    const normalizedIcon = icon.trim();
    if (normalizedIcon.length === 0 || normalizedIcon === this._currentSelectedIcon()) {
      return;
    }

    this._currentSelectedIcon.set(normalizedIcon);
    this.selectedIconChange.emit(normalizedIcon);
    this.iconSelected.emit(normalizedIcon);
  }
}
