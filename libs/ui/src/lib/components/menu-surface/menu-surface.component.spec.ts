import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMenuSurfaceLayout, MenuSurfaceComponent } from './menu-surface.component';

describe('MenuSurfaceComponent', () => {
  let component: MenuSurfaceComponent;
  let fixture: ComponentFixture<MenuSurfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuSurfaceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuSurfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render list class by default', () => {
    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('.ui-menu-surface--list')).toBeTruthy();
  });

  it('should render grid class when layout is grid', () => {
    fixture.componentRef.setInput('layout', EMenuSurfaceLayout.GRID);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('.ui-menu-surface--grid')).toBeTruthy();
  });
});
