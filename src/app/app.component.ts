import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AuthSessionLifecycleService } from '@app/core/services/auth-session-lifecycle.service';
import { ThemeService } from '@app/core/services/theme.service';

import { NotificationContainerComponent } from '@libs/components/notification/notification-container/notification-container.component';
import { BaseDirective } from '@libs/directives';
import { ESpacing } from '@libs/enums';

import { SessionInactivityModalComponent } from './core/components/session-inactivity-modal/session-inactivity-modal.component';
import { LanguageSelectorComponent } from './shared/components/language-selector/language-selector.component';
import { LogoComponent } from './shared/components/logo/logo.component';
import { ELogoLetterFill, ELogoVariant } from './shared/components/logo/logo.enums';
import { ThemeToggleComponent } from './shared/components/theme-toggle/theme-toggle.component';

const ROUTE_TRANSITION = {
  ENTER_INITIAL_TRANSFORM: 'translateY(8px)',
  LEAVE_FINAL_TRANSFORM: 'translateY(-4px)',
  ENTER_FINAL_TRANSFORM: 'translateY(0)',
  LEAVE_TIMING: '130ms cubic-bezier(0.4, 0, 1, 1)',
  ENTER_TIMING: '220ms cubic-bezier(0.22, 1, 0.36, 1)',
} as const;

const routeTransitionAnimations = [
  trigger('routeTransition', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(
        ':enter, :leave',
        [
          style({
            position: 'absolute',
            inset: 0,
          }),
        ],
        { optional: true },
      ),
      query(
        ':enter',
        [style({ opacity: 0, transform: ROUTE_TRANSITION.ENTER_INITIAL_TRANSFORM })],
        {
          optional: true,
        },
      ),
      group([
        query(
          ':leave',
          [
            animate(
              ROUTE_TRANSITION.LEAVE_TIMING,
              style({ opacity: 0, transform: ROUTE_TRANSITION.LEAVE_FINAL_TRANSFORM }),
            ),
          ],
          { optional: true },
        ),
        query(
          ':enter',
          [
            animate(
              ROUTE_TRANSITION.ENTER_TIMING,
              style({ opacity: 1, transform: ROUTE_TRANSITION.ENTER_FINAL_TRANSFORM }),
            ),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ]),
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NotificationContainerComponent,
    SessionInactivityModalComponent,
    LanguageSelectorComponent,
    LogoComponent,
    ThemeToggleComponent,
  ],
  animations: routeTransitionAnimations,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends BaseDirective {
  protected readonly _eSpacing: typeof ESpacing = ESpacing;
  protected readonly _brandLogoVariant: ELogoVariant = ELogoVariant.BOOKMARK_ANIMATED_S;
  protected readonly _brandLogoLetterFill: ELogoLetterFill = ELogoLetterFill.WHITE;
  protected readonly _authSessionLifecycleService: AuthSessionLifecycleService = inject(
    AuthSessionLifecycleService,
  );

  private readonly _themeService: ThemeService = inject(ThemeService);

  constructor() {
    super();
    this._themeService.initialize();
    this._authSessionLifecycleService.initialize();
  }

  public getRouteAnimationState(outlet: RouterOutlet): string {
    const typedOutlet = outlet as RouterOutlet & {
      activatedRouteData: { animation?: unknown };
    };
    const animationState = typedOutlet.activatedRouteData.animation;
    return typeof animationState === 'string' ? animationState : 'initial';
  }

  public onConfirmSessionStillActive(): void {
    this._authSessionLifecycleService.confirmStillHere();
  }
}
