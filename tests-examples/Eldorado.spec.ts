import test from "@playwright/test";

test.describe('Eldorado buy item test', () => {
  test
('Buy item', async ({ page }) => {
    await page.goto('https://eldorado.gg/');
    await page.locator('[id="menu-category-CustomItem"]').click();
    await page.getByText('Fortnite').click();
  });
});