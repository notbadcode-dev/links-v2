import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('totalPages', 10);
    fixture.componentRef.setInput('currentPage', 1);
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should show first three pages when current page is first', () => {
    fixture.componentRef.setInput('totalPages', 8);
    fixture.componentRef.setInput('currentPage', 1);
    fixture.detectChanges();

    expect(component.visiblePages()).toEqual([1, 2, 3]);
  });

  it('should show previous, current and next in middle pages', () => {
    fixture.componentRef.setInput('totalPages', 8);
    fixture.componentRef.setInput('currentPage', 4);
    fixture.detectChanges();

    expect(component.visiblePages()).toEqual([3, 4, 5]);
  });

  it('should show last three pages when current page is last', () => {
    fixture.componentRef.setInput('totalPages', 8);
    fixture.componentRef.setInput('currentPage', 8);
    fixture.detectChanges();

    expect(component.visiblePages()).toEqual([6, 7, 8]);
  });

  it('should emit selected page when selecting a different page', () => {
    fixture.componentRef.setInput('totalPages', 8);
    fixture.componentRef.setInput('currentPage', 4);
    fixture.detectChanges();

    const emitSpy = vi.spyOn(component.pageChange, 'emit');
    component.selectPage(5);

    expect(emitSpy).toHaveBeenCalledWith(5);
  });

  it('should disable previous and first buttons in first page', () => {
    fixture.componentRef.setInput('totalPages', 8);
    fixture.componentRef.setInput('currentPage', 1);
    fixture.detectChanges();

    expect(component.isFirstPage()).toBe(true);
  });

  it('should disable next and last buttons in last page', () => {
    fixture.componentRef.setInput('totalPages', 8);
    fixture.componentRef.setInput('currentPage', 8);
    fixture.detectChanges();

    expect(component.isLastPage()).toBe(true);
  });

  it('should hide navigation buttons in scroll mode when configured', () => {
    fixture.componentRef.setInput('totalPages', 8);
    fixture.componentRef.setInput('currentPage', 4);
    fixture.componentRef.setInput('config', {
      scrollMode: true,
      hideNavigationButtonsInScroll: true,
    });
    fixture.detectChanges();

    expect(component.showBoundaryButtons()).toBe(false);
    expect(component.showStepButtons()).toBe(false);
  });
});
