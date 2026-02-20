import { expect, test } from '@playwright/test';

test.describe('Language selector', () => {
  test('switches app language and keeps it across routes', async ({ page }) => {
    await page.goto('/login');

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Sign in to your account',
    );

    await page.locator('[data-testid="global-language-selector"] button').click();
    await page.locator('[data-testid="language-option-es"]').click();

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Inicia sesión en tu cuenta',
    );

    await page.goto('/signup');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Crea tu cuenta');
  });
});
