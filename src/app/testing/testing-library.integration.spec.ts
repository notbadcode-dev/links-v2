import { Component } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

@Component({
  standalone: true,
  template: `<button type="button" (click)="count = count + 1">Count: {{ count }}</button>`,
})
class TestCounterComponent {
  count = 0;
}

describe('Testing Library integration', () => {
  it('renders and interacts with a standalone Angular component', async () => {
    await render(TestCounterComponent);
    const user = userEvent.setup();

    const button = screen.getByRole('button', { name: /count: 0/i });
    await user.click(button);

    expect(screen.getByRole('button', { name: /count: 1/i })).toBeTruthy();
  });
});
