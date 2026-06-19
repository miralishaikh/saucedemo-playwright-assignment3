import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test.describe('Part A - Automation Basics', () => {

  test('Login with valid credentials lands on the inventory page', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.locator('#user-name').fill(USERNAME);
    await page.locator('#password').fill(PASSWORD);
    await page.locator('#login-button').click();

    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('Login with an invalid password shows an error message', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.locator('#user-name').fill(USERNAME);
    await page.locator('#password').fill('wrong_password');
    await page.locator('#login-button').click();

    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Username and password do not match'
    );
  });

  test('Adding 2 items to the cart shows a badge count of 2', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#user-name').fill(USERNAME);
    await page.locator('#password').fill(PASSWORD);
    await page.locator('#login-button').click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });

  test('Completing checkout shows the order confirmation message', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#user-name').fill(USERNAME);
    await page.locator('#password').fill(PASSWORD);
    await page.locator('#login-button').click();

    // Add an item and go to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();

    // Checkout step one: customer info
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();

    // Checkout step two: finish order
    await page.locator('[data-test="finish"]').click();

    await expect(page.locator('.complete-header')).toBeVisible();
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

  test('Logout redirects back to the login page', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#user-name').fill(USERNAME);
    await page.locator('#password').fill(PASSWORD);
    await page.locator('#login-button').click();

    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();

    await expect(page).toHaveURL(`${BASE_URL}/`);
    await expect(page.locator('#login-button')).toBeVisible();
  });

  test('Sorting by Price (Low to High) orders the first item below the last', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#user-name').fill(USERNAME);
    await page.locator('#password').fill(PASSWORD);
    await page.locator('#login-button').click();

    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

    const prices = page.locator('.inventory_item_price');
    const firstPriceText = await prices.first().textContent();
    const lastPriceText = await prices.last().textContent();

    const firstPrice = parseFloat((firstPriceText ?? '0').replace('$', ''));
    const lastPrice = parseFloat((lastPriceText ?? '0').replace('$', ''));

    expect(firstPrice).toBeLessThan(lastPrice);
  });

});
