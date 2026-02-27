import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Directive,
  input,
  InputSignal,
  Signal,
} from '@angular/core';

export enum EMenuSurfaceLayout {
  LIST = 'list',
  GRID = 'grid',
}

@Directive({
  selector: '[uiMenuOption]',
  standalone: true,
  host: {
    class: 'ui-menu-option',
    '[class.ui-menu-option--active]': 'active()',
  },
})
export class UiMenuOptionDirective {
  public readonly active: InputSignal<boolean> = input<boolean>(false, {
    alias: 'uiMenuOptionActive',
  });
}

@Component({
  selector: 'ui-menu-surface',
  standalone: true,
  templateUrl: './menu-surface.component.html',
  styleUrl: './menu-surface.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuSurfaceComponent {
  public readonly layout: InputSignal<EMenuSurfaceLayout> = input<EMenuSurfaceLayout>(
    EMenuSurfaceLayout.LIST,
  );
  public readonly columns: InputSignal<number> = input<number>(1);
  public readonly columnsCssValue: Signal<string> = computed(() => {
    const requestedColumns = Math.floor(this.columns());
    return `${requestedColumns > 0 ? requestedColumns : 1}`;
  });

  public readonly EMenuSurfaceLayout: typeof EMenuSurfaceLayout = EMenuSurfaceLayout;
}
