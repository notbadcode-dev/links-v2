import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideTranslocoScope } from '@jsverse/transloco';

import { BaseDirective } from '@libs/directives';

@Component({
  selector: 'dashboard',
  standalone: true,
  providers: [provideTranslocoScope('dashboard')],
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent extends BaseDirective {}
