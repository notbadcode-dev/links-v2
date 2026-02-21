import { expect, test } from '@playwright/test';

test.describe('Language selector', () => {
  test('switches app language and keeps it across routes', async ({ page }) => {
    await page.goto('/login');
    const loginTitle = page.locator('.login-page h1').first();
    const signupTitle = page.locator('.signup-page h1').first();

    await expect(loginTitle).toHaveText('Sign in to your account');

    await page.locator('[data-testid="global-language-selector"] button').click();
    await page.locator('[data-testid="language-option-es"]').click();

    await expect(loginTitle).toHaveText('Inicia sesión en tu cuenta');

    await page.locator('[data-testid="auth-link-signup"]').click();
    await expect(page).toHaveURL(/\/signup$/);
    await expect(signupTitle).toHaveText('Crea tu cuenta');

    await page.reload();
    await expect(page).toHaveURL(/\/signup$/);
    await expect(signupTitle).toHaveText('Crea tu cuenta');

    await page.locator('[data-testid="auth-link-login"]').click();
    await expect(page).toHaveURL(/\/login$/);
    await expect(loginTitle).toHaveText('Inicia sesión en tu cuenta');
  });
});
