import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DropdownWrapperComponent } from './dropdown-wrapper.component';

describe('DropdownWrapperComponent', () => {
  let component: DropdownWrapperComponent;
  let fixture: ComponentFixture<DropdownWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownWrapperComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selected item', () => {
    const emitSpy = vi.spyOn(component.itemSelected, 'emit');

    component.onItemClick({ id: 1 });

    expect(emitSpy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should accept optional tooltip input', () => {
    fixture.componentRef.setInput('tooltip', 'Open options');
    fixture.detectChanges();

    expect(component.tooltip()).toBe('Open options');
  });
});
