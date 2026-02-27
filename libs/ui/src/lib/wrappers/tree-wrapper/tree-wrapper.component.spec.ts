import { ɵresolveComponentResources as resolveComponentResources } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { TreeWrapperComponent } from './tree-wrapper.component';
import { ITreeNode } from './tree-wrapper.types';

describe('TreeWrapperComponent', () => {
  let component: TreeWrapperComponent;
  let fixture: ComponentFixture<TreeWrapperComponent>;

  const treeData: ITreeNode[] = [
    {
      id: 'root',
      label: 'Root',
      icon: 'folder',
      children: [
        {
          id: 'leaf',
          label: 'Leaf',
          icon: 'description',
        },
      ],
    },
  ];

  beforeAll(async () => {
    await resolveComponentResources(async (url: string) => {
      const response = await fetch(url);
      return response.text();
    });
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeWrapperComponent],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(TreeWrapperComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('dataSource', treeData);
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should render node labels', () => {
    fixture.componentRef.setInput('dataSource', treeData);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.textContent).toContain('Root');
  });

  it('should use default toggle icons when config is not provided', () => {
    fixture.componentRef.setInput('dataSource', treeData);
    fixture.detectChanges();

    expect(component.expandedIcon()).toBe('expand_more');
    expect(component.collapsedIcon()).toBe('chevron_right');
  });

  it('should apply custom config and classes', () => {
    fixture.componentRef.setInput('dataSource', treeData);
    fixture.componentRef.setInput('config', {
      expandedIcon: 'remove',
      collapsedIcon: 'add',
      customClass: 'tree-test-class',
      dense: true,
      showLines: true,
      ariaLabel: 'Navigation tree',
    });
    fixture.detectChanges();

    const matTree = fixture.debugElement.query(By.css('mat-tree'));
    expect(component.expandedIcon()).toBe('remove');
    expect(component.collapsedIcon()).toBe('add');
    expect(matTree.nativeElement.classList.contains('tree-test-class')).toBe(true);
    expect(matTree.nativeElement.classList.contains('tree-wrapper--dense')).toBe(true);
    expect(matTree.nativeElement.classList.contains('tree-wrapper--show-lines')).toBe(true);
    expect(matTree.nativeElement.getAttribute('aria-label')).toBe('Navigation tree');
  });

  it('should emit nodeSelected when clicking a leaf node', () => {
    fixture.componentRef.setInput('dataSource', treeData);
    fixture.detectChanges();

    const emitSpy = vi.spyOn(component.nodeSelected, 'emit');
    const leafNode = fixture.debugElement.query(By.css('.node-content.leaf'));

    leafNode.nativeElement.click();

    expect(emitSpy).toHaveBeenCalledWith(treeData[0]);
  });

  it('should not emit nodeSelected for disabled nodes', () => {
    fixture.componentRef.setInput('dataSource', [{ id: 1, label: 'Disabled', disabled: true }]);
    fixture.detectChanges();

    const emitSpy = vi.spyOn(component.nodeSelected, 'emit');
    const leafNode = fixture.debugElement.query(By.css('.node-content.leaf'));

    leafNode.nativeElement.click();

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should emit nodeToggle when toggle button is clicked', () => {
    fixture.componentRef.setInput('dataSource', treeData);
    fixture.detectChanges();

    const emitSpy = vi.spyOn(component.nodeToggle, 'emit');
    const toggleButton = fixture.debugElement.query(By.css('.tree-toggle'));

    toggleButton.nativeElement.click();

    expect(emitSpy).toHaveBeenCalledWith({ node: treeData[0], expanded: true });
  });

  it('should apply selected class when selectedNodeId matches node id', () => {
    fixture.componentRef.setInput('dataSource', treeData);
    fixture.componentRef.setInput('selectedNodeId', 'root');
    fixture.detectChanges();

    const selectedNode = fixture.debugElement.query(By.css('.node-content--selected'));
    expect(selectedNode).toBeTruthy();
  });

  it('should resolve children from configured dynamic field', () => {
    const dynamicTree = [
      {
        id: 'root',
        label: 'Root',
        items: [{ id: 'child', label: 'Child' }],
      },
    ] as unknown as ITreeNode[];

    fixture.componentRef.setInput('dataSource', dynamicTree);
    fixture.componentRef.setInput('config', { childrenField: 'items' });
    fixture.detectChanges();

    expect(component.hasChild(0, dynamicTree[0])).toBe(true);
    expect(component.childrenAccessor(dynamicTree[0])).toHaveLength(1);
  });
});
