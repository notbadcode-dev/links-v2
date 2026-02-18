import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';

import { BaseDirective } from '../../directives/base.directive';
import { ITreeNode, ITreeWrapperConfig } from './tree-wrapper.types';

const TREE_DEFAULT_ICONS = {
  EXPANDED: 'expand_more',
  COLLAPSED: 'chevron_right',
} as const;

@Component({
  selector: 'tree-wrapper',
  templateUrl: './tree-wrapper.component.html',
  styleUrl: './tree-wrapper.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTreeModule, MatIconModule, MatButtonModule],
})
export class TreeWrapperComponent<TNode = unknown> extends BaseDirective {
  public readonly dataSource: InputSignal<ITreeNode<TNode>[]> =
    input.required<ITreeNode<TNode>[]>();

  public readonly config: InputSignal<ITreeWrapperConfig | undefined> = input<ITreeWrapperConfig>();

  public readonly nodeSelected: OutputEmitterRef<ITreeNode<TNode>> = output<ITreeNode<TNode>>();

  public readonly nodeToggle: OutputEmitterRef<{ node: ITreeNode<TNode>; expanded: boolean }> =
    output<{ node: ITreeNode<TNode>; expanded: boolean }>();

  public readonly expandedIcon: Signal<string> = computed(
    () => this.config()?.expandedIcon ?? TREE_DEFAULT_ICONS.EXPANDED,
  );

  public readonly collapsedIcon: Signal<string> = computed(
    () => this.config()?.collapsedIcon ?? TREE_DEFAULT_ICONS.COLLAPSED,
  );

  public readonly childrenAccessor = (node: ITreeNode<TNode>): ITreeNode<TNode>[] =>
    node.children ?? [];

  public readonly hasChild = (_: number, node: ITreeNode<TNode>): boolean =>
    !!node.children && node.children.length > 0;

  public onNodeClick(node: ITreeNode<TNode>): void {
    this.nodeSelected.emit(node);
  }
}
