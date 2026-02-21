import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'session-inactivity-modal',
  standalone: true,
  templateUrl: './session-inactivity-modal.component.html',
  styleUrl: './session-inactivity-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionInactivityModalComponent {
  @Output() public readonly keepSessionActive: EventEmitter<void> = new EventEmitter<void>();

  private readonly _translocoService: TranslocoService = inject(TranslocoService);

  public get title(): string {
    return this._translocoService.translate('common.session.inactivity_modal.title');
  }

  public get description(): string {
    return this._translocoService.translate('common.session.inactivity_modal.description');
  }

  public get autoLogoutWarning(): string {
    return this._translocoService.translate('common.session.inactivity_modal.auto_logout_warning');
  }

  public get confirmLabel(): string {
    return this._translocoService.translate('common.session.inactivity_modal.confirm_button');
  }

  public onKeepSessionActive(): void {
    this.keepSessionActive.emit();
  }
}
