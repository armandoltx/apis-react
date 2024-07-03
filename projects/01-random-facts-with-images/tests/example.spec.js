// @ts-check
import { test, expect } from '@playwright/test'

const LOCALHOST_URL = 'http://localhost:5173/'
const CAT_PREFIX_IMAGE_URL = "https://cataas.com/cat/"

test('has title', async ({ page }) => {
  await page.goto(LOCALHOST_URL);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Random Facts");
});

test('Has title h1', async ({ page }) => {
  await page.goto(LOCALHOST_URL)
  await expect(page.getByRole('heading', { name: 'Random Hechos' })).toBeVisible()
})

test('App shows random cat facts', async ({ page }) => {
  await page.goto(LOCALHOST_URL)
  const text = await page.getByRole('paragraph')
  const textContent = await text.textContent()
  await expect(textContent?.length).toBeGreaterThan(0)
})

test('App shows an image', async ({ page }) => {
  await page.goto(LOCALHOST_URL)
  const image = await page.getByRole('img')
  const imageSrc = await image.getAttribute('src')
  await expect(imageSrc?.length).toBeGreaterThan(0)
  await expect(imageSrc?.startsWith(CAT_PREFIX_IMAGE_URL)).toBeTruthy()
})

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
