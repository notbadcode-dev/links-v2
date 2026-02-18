import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICONS_CONSTANTS } from '@app/constants/icons.constants';
import { provideTranslocoScope } from '@jsverse/transloco';

import { BaseDirective, CardWrapperComponent, ITreeNode, TreeWrapperComponent } from '@libs/ui';
import { DASHBOARD_CONSTANTS } from './constants/dashboard.constants';

@Component({
  selector: 'dashboard',
  standalone: true,
  providers: [provideTranslocoScope('dashboard')],
  imports: [CardWrapperComponent, TreeWrapperComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent extends BaseDirective {
  public readonly categories: ITreeNode<unknown>[] = [
    {
      id: DASHBOARD_CONSTANTS.CATEGORIES.DEVELOPMENT.ID,
      label: DASHBOARD_CONSTANTS.CATEGORIES.DEVELOPMENT.LABEL,
      icon: ICONS_CONSTANTS.DASHBOARD.CODE,
      children: [
        {
          id: DASHBOARD_CONSTANTS.CATEGORIES.DEVELOPMENT.CHILDREN.ANGULAR.ID,
          label: DASHBOARD_CONSTANTS.CATEGORIES.DEVELOPMENT.CHILDREN.ANGULAR.LABEL,
          icon: ICONS_CONSTANTS.DASHBOARD.CODE,
        },
        {
          id: DASHBOARD_CONSTANTS.CATEGORIES.DEVELOPMENT.CHILDREN.TYPESCRIPT.ID,
          label: DASHBOARD_CONSTANTS.CATEGORIES.DEVELOPMENT.CHILDREN.TYPESCRIPT.LABEL,
          icon: ICONS_CONSTANTS.DASHBOARD.CODE,
        },
      ],
    },
    {
      id: DASHBOARD_CONSTANTS.CATEGORIES.DESIGN.ID,
      label: DASHBOARD_CONSTANTS.CATEGORIES.DESIGN.LABEL,
      icon: ICONS_CONSTANTS.AUTH.USER,
      children: [
        {
          id: DASHBOARD_CONSTANTS.CATEGORIES.DESIGN.CHILDREN.RECIPES.ID,
          label: DASHBOARD_CONSTANTS.CATEGORIES.DESIGN.CHILDREN.RECIPES.LABEL,
          icon: ICONS_CONSTANTS.DASHBOARD.RESTAURANT,
        },
        {
          id: DASHBOARD_CONSTANTS.CATEGORIES.DESIGN.CHILDREN.TRAVEL.ID,
          label: DASHBOARD_CONSTANTS.CATEGORIES.DESIGN.CHILDREN.TRAVEL.LABEL,
          icon: ICONS_CONSTANTS.DASHBOARD.FLIGHT,
        },
      ],
    },
  ];

  public onCategorySelect(_node: ITreeNode): void {

  }
}
