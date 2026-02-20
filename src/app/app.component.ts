import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

import { ICONS_CONSTANTS } from '@app/constants/icons.constants';
import { ThemeService } from '@app/core/services/theme.service';

import { NotificationContainerComponent } from '@libs/components';
import { BaseDirective } from '@libs/directives';

import { LanguageSelectorComponent } from './shared/components/language-selector/language-selector.component';
import { ThemeToggleComponent } from './shared/components/theme-toggle/theme-toggle.component';

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
      query(':enter', [style({ opacity: 0.86, transform: 'translateY(2px) scale(0.998)' })], {
        optional: true,
      }),
      group([
        query(
          ':leave',
          [
            animate(
              '90ms cubic-bezier(0.4, 0, 1, 1)',
              style({ opacity: 0.94, transform: 'translateY(0) scale(1)' }),
            ),
          ],
          { optional: true },
        ),
        query(
          ':enter',
          [
            animate(
              '130ms cubic-bezier(0.22, 1, 0.36, 1)',
              style({ opacity: 1, transform: 'translateY(0) scale(1)' }),
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
    LanguageSelectorComponent,
    ThemeToggleComponent,
    MatIconModule,
  ],
  animations: routeTransitionAnimations,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends BaseDirective {
  public readonly icons: typeof ICONS_CONSTANTS = ICONS_CONSTANTS;
  public routeAnimationState: string = 'initial';

  private readonly _router: Router = inject(Router);
  private readonly _themeService: ThemeService = inject(ThemeService);

  constructor() {
    super();
    this._themeService.initialize();
    this._setRouteAnimationState();
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => {
        this._setRouteAnimationState();
      });
  }

  private _setRouteAnimationState(): void {
    let activeRoute = this._router.routerState.snapshot.root;

    while (activeRoute.firstChild) {
      activeRoute = activeRoute.firstChild;
    }

    const { data, pathFromRoot } = activeRoute;
    const animationKey = typeof data['animation'] === 'string' ? data['animation'] : '';
    const fallbackPath = pathFromRoot
      .map(({ routeConfig }) => routeConfig?.path)
      .filter((path): path is string => Boolean(path))
      .join('/');

    this.routeAnimationState = animationKey || fallbackPath || 'initial';
  }
}
