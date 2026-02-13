import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let buttonElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('title', 'Test Button');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    fixture.componentRef.setInput('title', 'Test Button');
    fixture.detectChanges();

    const buttonText = fixture.debugElement.query(By.css('.button-text'));
    expect(buttonText.nativeElement.textContent).toBe('Test Button');
  });

  it('should use title as tooltip when tooltip is not provided', () => {
    fixture.componentRef.setInput('title', 'Test Button');
    fixture.detectChanges();

    expect(component.effectiveTooltip()).toBe('Test Button');
  });

  it('should use custom tooltip when provided', () => {
    fixture.componentRef.setInput('title', 'Test Button');
    fixture.componentRef.setInput('tooltip', 'Custom Tooltip');
    fixture.detectChanges();

    expect(component.effectiveTooltip()).toBe('Custom Tooltip');
  });

  it('should render icon when provided', () => {
    fixture.componentRef.setInput('title', 'Test Button');
    fixture.componentRef.setInput('icon', 'home');
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('mat-icon'));
    expect(icon).toBeTruthy();
    expect(icon.nativeElement.textContent.trim()).toBe('home');
  });

  it('should not render icon when not provided', () => {
    fixture.componentRef.setInput('title', 'Test Button');
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('mat-icon'));
    expect(icon).toBeFalsy();
  });

  it('should be disabled when disabled input is true', () => {
    fixture.componentRef.setInput('title', 'Test Button');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.disabled).toBe(true);
  });

  it('should be disabled when loading input is true', () => {
    fixture.componentRef.setInput('title', 'Test Button');
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.disabled).toBe(true);
  });

  it('should show spinner when loading', () => {
    fixture.componentRef.setInput('title', 'Test Button');
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinner).toBeTruthy();
  });

  it('should hide icon when loading', () => {
    fixture.componentRef.setInput('title', 'Test Button');
    fixture.componentRef.setInput('icon', 'home');
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('mat-icon'));
    expect(icon).toBeFalsy();
  });

  it('should emit clicked event on click', () => {
    fixture.componentRef.setInput('title', 'Test Button');
    fixture.detectChanges();

    let clickedEvent: Event | undefined;
    component.clicked.subscribe((event) => {
      clickedEvent = event;
    });

    buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.nativeElement.click();

    expect(clickedEvent).toBeDefined();
  });

  it('should prevent double click', (done) => {
    fixture.componentRef.setInput('title', 'Test Button');
    fixture.detectChanges();

    let clickCount = 0;
    component.clicked.subscribe(() => {
      clickCount++;
    });

    buttonElement = fixture.debugElement.query(By.css('button'));

    // First click
    buttonElement.nativeElement.click();
    expect(clickCount).toBe(1);

    // Immediate second click should be ignored
    buttonElement.nativeElement.click();
    expect(clickCount).toBe(1);

    // After debounce time, click should work again
    setTimeout(() => {
      buttonElement.nativeElement.click();
      expect(clickCount).toBe(2);
      done();
    }, 350);
  });

  it('should not emit clicked event when disabled', () => {
    fixture.componentRef.setInput('title', 'Test Button');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    let clickedEvent: Event | undefined;
    component.clicked.subscribe((event) => {
      clickedEvent = event;
    });

    buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.nativeElement.click();

    expect(clickedEvent).toBeUndefined();
  });

  it('should apply correct size class', () => {
    fixture.componentRef.setInput('title', 'Test Button');
    fixture.componentRef.setInput('size', 'small');
    fixture.detectChanges();

    const host = fixture.debugElement.nativeElement;
    expect(host.classList.contains('button-small')).toBe(true);
  });

  it('should apply full-width class when fullWidth is true', () => {
    fixture.componentRef.setInput('title', 'Test Button');
    fixture.componentRef.setInput('fullWidth', true);
    fixture.detectChanges();

    buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.classList.contains('full-width')).toBe(
      true,
    );
  });

  it('should position icon on the right when iconPosition is right', () => {
    fixture.componentRef.setInput('title', 'Test Button');
    fixture.componentRef.setInput('icon', 'home');
    fixture.componentRef.setInput('iconPosition', 'right');
    fixture.detectChanges();

    const icon = fixture.debugElement.query(
      By.css('.button-icon.icon-right'),
    );
    expect(icon).toBeTruthy();
  });
});
