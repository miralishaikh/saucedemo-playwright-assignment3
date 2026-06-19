import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test.describe('Part B - Page Object Model (Login)', () => {

  test('Positive: valid credentials land on the inventory page', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);

    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('Negative: invalid password shows an error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(USERNAME, 'wrong_password');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(
      'Username and password do not match'
    );
  });

});
