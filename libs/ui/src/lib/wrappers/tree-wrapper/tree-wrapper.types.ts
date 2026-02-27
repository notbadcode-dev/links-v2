export interface ITreeNode<TNode = unknown> {
  id: string | number;
  label: string;
  icon?: string;
  disabled?: boolean;
  data?: TNode;
  children?: ITreeNode<TNode>[];
}

export interface ITreeWrapperConfig {
  ariaLabel?: string;

  childrenField?: string;

  showLines?: boolean;

  dense?: boolean;

  expandedIcon?: string;

  collapsedIcon?: string;

  customClass?: string;
}
