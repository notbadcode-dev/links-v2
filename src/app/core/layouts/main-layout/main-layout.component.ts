import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

import { ICONS_CONSTANTS } from '@app/constants/icons.constants';
import { BaseDirective } from '@libs/ui';

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, MatIconModule, MatButtonModule],
})
export class MainLayoutComponent extends BaseDirective {
  public readonly icons: typeof ICONS_CONSTANTS = ICONS_CONSTANTS;
}
