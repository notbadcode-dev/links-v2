import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

import { EPageLayout } from '../../enums/ui.enums';

@Component({
  selector: 'ui-page-header, ui-page-body, ui-page-footer',
  standalone: true,
  templateUrl: './page-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiPageSectionComponent {}

@Component({
  selector: 'ui-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
  public readonly layout: InputSignal<EPageLayout> = input<EPageLayout>(EPageLayout.DEFAULT);
}
