import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

import { ICONS_CONSTANTS } from '@app/constants/icons.constants';
import { I18nDirective } from '@app/core/i18n';
import { AuthSessionLifecycleService } from '@app/core/services/auth-session-lifecycle.service';
import { UserService } from '@app/core/services/user.service';
import { pickRandomItem } from '@app/shared/utils/random.utils';

import { BaseDirective } from '@libs/directives';
import { EButtonWrapperVariant } from '@libs/enums';
import { ButtonWrapperComponent } from '@libs/wrappers';

const LOGOUT_TOOLTIP_KEYS = [
  'common.actions.tooltips.logout.option_1',
  'common.actions.tooltips.logout.option_2',
  'common.actions.tooltips.logout.option_3',
  'common.actions.tooltips.logout.option_4',
  'common.actions.tooltips.logout.option_5',
] as const;

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, MatIconModule, ButtonWrapperComponent, I18nDirective],
})
export class MainLayoutComponent extends BaseDirective {
  public readonly icons: typeof ICONS_CONSTANTS = ICONS_CONSTANTS;
  public readonly EButtonWrapperVariant: typeof EButtonWrapperVariant = EButtonWrapperVariant;
  public readonly activeEmail: Signal<string>;
  public readonly logoutTooltipKey: (typeof LOGOUT_TOOLTIP_KEYS)[number] =
    pickRandomItem(LOGOUT_TOOLTIP_KEYS) ?? LOGOUT_TOOLTIP_KEYS[0];

  private readonly _authSessionLifecycleService: AuthSessionLifecycleService = inject(
    AuthSessionLifecycleService,
  );
  private readonly _userService: UserService = inject(UserService);

  constructor() {
    super();
    this.activeEmail = computed(() => this._userService.email() || 'guest@bookmarks.app');
  }

  public onLogout(): void {
    this._authSessionLifecycleService.logout();
  }
}
