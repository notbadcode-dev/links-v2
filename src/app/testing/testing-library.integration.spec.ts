import { Component } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

@Component({
  selector: 'app-test-counter',
  standalone: true,
  templateUrl: './testing-library.integration.spec.host.html',
})
class TestCounterComponent {
  public count: number = 0;
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
