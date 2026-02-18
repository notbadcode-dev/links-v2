export interface ITreeNode<TNode = unknown> {
  id: string | number;
  label: string;
  icon?: string;
  data?: TNode;
  children?: ITreeNode<TNode>[];
}

export interface ITreeWrapperConfig {

  childrenField?: string;

  showLines?: boolean;

  expandedIcon?: string;

  collapsedIcon?: string;

  customClass?: string;
}
