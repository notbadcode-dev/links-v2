import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LinkComponent } from './link.component';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('route', '/dashboard');
    fixture.componentRef.setInput('label', 'Dashboard');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render link label', () => {
    const anchor = fixture.nativeElement.querySelector('a') as HTMLAnchorElement | null;

    expect(anchor?.textContent).toContain('Dashboard');
  });

  it('should accept optional tooltip input', () => {
    fixture.componentRef.setInput('tooltip', 'Go to dashboard');
    fixture.detectChanges();

    expect(component.tooltip()).toBe('Go to dashboard');
  });
});
