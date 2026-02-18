export interface ITreeNode<TNode = unknown> {
  id: string | number;
  label: string;
  icon?: string;
  data?: TNode;
  children?: ITreeNode<TNode>[];
}

export interface ITreeWrapperConfig {
  /** Field name for children array. Defaults to 'children' */
  childrenField?: string;
  /** Whether to show lines between nodes */
  showLines?: boolean;
  /** Icon for expanded state (folder-open) */
  expandedIcon?: string;
  /** Icon for collapsed state (folder) */
  collapsedIcon?: string;
  /** Custom CSS class for the tree */
  customClass?: string;
}
