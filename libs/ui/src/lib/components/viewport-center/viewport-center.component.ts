import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BaseDirective } from '@libs/directives';

@Component({
  selector: 'viewport-center',
  templateUrl: './viewport-center.component.html',
  styleUrl: './viewport-center.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewportCenterComponent extends BaseDirective {}
