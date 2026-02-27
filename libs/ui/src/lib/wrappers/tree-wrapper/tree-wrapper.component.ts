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

import { BaseDirective } from '@libs/directives';

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
  public readonly selectedNodeId: InputSignal<string | number | null> = input<
    string | number | null
  >(null);

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

  public readonly ariaLabel: Signal<string> = computed(() => this.config()?.ariaLabel ?? 'Tree');
  public readonly rootClasses: Signal<string> = computed(() => {
    const classes = ['tree-wrapper'];
    const config = this.config();

    if (config?.showLines) {
      classes.push('tree-wrapper--show-lines');
    }

    if (config?.dense) {
      classes.push('tree-wrapper--dense');
    }

    if ((config?.customClass?.trim().length ?? 0) > 0) {
      classes.push(config?.customClass?.trim() ?? '');
    }

    return classes.join(' ');
  });

  public readonly childrenAccessor = (node: ITreeNode<TNode>): ITreeNode<TNode>[] =>
    this._getChildren(node);

  public readonly hasChild = (_: number, node: ITreeNode<TNode>): boolean =>
    this._getChildren(node).length > 0;

  public onNodeClick(node: ITreeNode<TNode>): void {
    if (node.disabled) {
      return;
    }

    this.nodeSelected.emit(node);
  }

  public onNodeToggle(node: ITreeNode<TNode>, isExpanded: boolean): void {
    this.nodeToggle.emit({ node, expanded: !isExpanded });
  }

  public isSelected(node: ITreeNode<TNode>): boolean {
    return node.id === this.selectedNodeId();
  }

  private _getChildren(node: ITreeNode<TNode>): ITreeNode<TNode>[] {
    const field = this.config()?.childrenField;
    if (!field || field === 'children') {
      return node.children ?? [];
    }

    const dynamicChildren = (node as unknown as Record<string, unknown>)[field];
    if (!Array.isArray(dynamicChildren)) {
      return [];
    }

    return dynamicChildren.filter(this._isTreeNode);
  }

  private readonly _isTreeNode = (value: unknown): value is ITreeNode<TNode> =>
    (() => {
      if (!value || typeof value !== 'object') {
        return false;
      }

      const candidate = value as Record<string, unknown>;
      return (
        (typeof candidate['id'] === 'string' || typeof candidate['id'] === 'number') &&
        typeof candidate['label'] === 'string'
      );
    })();
}
