import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ButtonWrapperComponent } from './button-wrapper.component';
import { EButtonWrapperColor, EButtonWrapperVariant } from './button-wrapper.enum';

describe('ButtonWrapperComponent', () => {
  let component: ButtonWrapperComponent;
  let fixture: ComponentFixture<ButtonWrapperComponent>;
  let buttonElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonWrapperComponent],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonWrapperComponent);
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

    const host = fixture.nativeElement as HTMLElement;
    expect(host.textContent).toContain('Test Button');
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

  it('should be disabled when disabled input is true', () => {
    fixture.componentRef.setInput('title', 'Test Button');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.disabled).toBe(true);
  });

  it('should emit clicked event on click', () => {
    fixture.componentRef.setInput('title', 'Test Button');
    fixture.detectChanges();

    let clickedEvent: Event | undefined;
    component.clicked.subscribe((event) => {
      clickedEvent = event;
    });

    component.handleClick(new MouseEvent('click'));

    expect(clickedEvent).toBeDefined();
  });

  it('should prevent clicks while processing', (done) => {
    fixture.componentRef.setInput('title', 'Test Button');
    fixture.detectChanges();

    let clickCount = 0;
    component.clicked.subscribe(() => {
      clickCount++;
    });

    component.handleClick(new MouseEvent('click'));
    expect(clickCount).toBe(1);

    component.handleClick(new MouseEvent('click'));
    expect(clickCount).toBe(1);

    setTimeout(() => {
      component.handleClick(new MouseEvent('click'));
      expect(clickCount).toBe(2);
      done();
    }, 0);
  });

  it('should not emit clicked event when disabled', () => {
    fixture.componentRef.setInput('title', 'Test Button');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    let clickedEvent: Event | undefined;
    component.clicked.subscribe((event) => {
      clickedEvent = event;
    });

    component.handleClick(new MouseEvent('click'));

    expect(clickedEvent).toBeUndefined();
  });

  it('should apply variant correct button type', () => {
    fixture.componentRef.setInput('title', 'Test Button');
    fixture.componentRef.setInput('variant', EButtonWrapperVariant.FLAT);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.hasAttribute('mat-flat-button')).toBe(true);
  });

  it('should apply correct color', () => {
    fixture.componentRef.setInput('title', 'Test Button');
    fixture.componentRef.setInput('color', EButtonWrapperColor.WARN);
    fixture.detectChanges();

    expect(component.color()).toBe(EButtonWrapperColor.WARN);
  });
});
