import { OverlayContainer } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { IconCircleComponent } from './icon-circle.component';

describe('IconCircleComponent', () => {
  let component: IconCircleComponent;
  let fixture: ComponentFixture<IconCircleComponent>;
  let overlayContainer: OverlayContainer;
  let overlayElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconCircleComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(IconCircleComponent);
    component = fixture.componentInstance;
    overlayContainer = TestBed.inject(OverlayContainer);
    overlayElement = overlayContainer.getContainerElement();
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should use selectedIcon when included in icons list', () => {
    fixture.componentRef.setInput('icons', [
      'auth-user-sidebar',
      'theme-toggle-animated',
      'auth-login-button',
    ]);
    fixture.componentRef.setInput('selectedIcon', 'theme-toggle-animated');
    fixture.detectChanges();

    expect(component.effectiveSelectedIcon()).toBe('theme-toggle-animated');
  });

  it('should fallback to first icon when selectedIcon is not available', () => {
    fixture.componentRef.setInput('icons', ['auth-user-sidebar', 'theme-toggle-animated']);
    fixture.componentRef.setInput('selectedIcon', 'unknown');
    fixture.detectChanges();

    expect(component.effectiveSelectedIcon()).toBe('auth-user-sidebar');
  });

  it('should render popup options when trigger is clicked', () => {
    fixture.componentRef.setInput('icons', [
      'auth-user-sidebar',
      'theme-toggle-animated',
      'auth-login-button',
    ]);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector(
      '.icon-circle__trigger-button',
    ) as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();

    const options = overlayElement.querySelectorAll('.icon-circle__option');
    expect(options.length).toBe(3);
  });

  it('should emit selectedIconChange and iconSelected when icon changes', () => {
    fixture.componentRef.setInput('icons', ['auth-user-sidebar', 'theme-toggle-animated']);
    fixture.componentRef.setInput('selectedIcon', 'auth-user-sidebar');
    fixture.detectChanges();

    const selectedIconChangeSpy = vi.spyOn(component.selectedIconChange, 'emit');
    const iconSelectedSpy = vi.spyOn(component.iconSelected, 'emit');

    component.onSelectIcon('theme-toggle-animated');

    expect(component.effectiveSelectedIcon()).toBe('theme-toggle-animated');
    expect(selectedIconChangeSpy).toHaveBeenCalledWith('theme-toggle-animated');
    expect(iconSelectedSpy).toHaveBeenCalledWith('theme-toggle-animated');
  });

  it('should not emit when selected icon is repeated', () => {
    fixture.componentRef.setInput('icons', ['auth-user-sidebar', 'theme-toggle-animated']);
    fixture.componentRef.setInput('selectedIcon', 'theme-toggle-animated');
    fixture.detectChanges();

    const selectedIconChangeSpy = vi.spyOn(component.selectedIconChange, 'emit');
    const iconSelectedSpy = vi.spyOn(component.iconSelected, 'emit');

    component.onSelectIcon('theme-toggle-animated');

    expect(selectedIconChangeSpy).not.toHaveBeenCalled();
    expect(iconSelectedSpy).not.toHaveBeenCalled();
  });
});
