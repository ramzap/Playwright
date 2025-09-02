import { Page, Locator, expect } from '@playwright/test';

export class CreateAccountPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly phoneInput: Locator;
  readonly createAccountButton: Locator;
  readonly errorAlert: Locator;
  readonly welcomeHeader: Locator;
  userId: string = '';

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.phoneInput = page.locator('input[name="phone"]');
    this.createAccountButton = page.locator('button[type="submit"].btn');
    this.errorAlert = page.locator('div.alert.alert-error');
    this.welcomeHeader = page.locator('div.header h1');
  }

  async fillForm(email: string, password: string, phone: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.phoneInput.fill(phone);
  }

async submit() {
  const [response] = await Promise.all([
    this.page.waitForResponse(res =>
      res.url().includes('/api/users') &&
      res.request().method() === 'POST' &&
      res.status() === 201
    ),
    this.createAccountButton.click()
  ]);

  const body = await response.json();

  const userId = body?.data?.userId;

  if (!userId || typeof userId !== 'string') {
    throw new Error(`❌ Registration succeeded but userId was not returned in response.`);
  }

  this.userId = userId;
  console.log(`✅ Registered userId: ${this.userId}`);
}


  async checkForErrors() {
    try {
      await this.errorAlert.waitFor({ timeout: 3000 });
      const errorText = await this.errorAlert.textContent();
      throw new Error(`❌ Registration failed: ${errorText?.trim()}`);
    } catch (error) {
      if (error instanceof Error && error.message.includes('Timeout')) {
        return; // No error alert appeared — that's a success.
      }
      throw error; // Unexpected error
    }
  }

  async expectWelcomeMessage(email: string) {
    await expect(this.welcomeHeader).toHaveText(`Welcome, ${email}!`);
  }

  // ✅ New helper method for full flow in one call
  async registerAndVerify(email: string, password: string, phone: string) {
    await this.page.goto('/');
    await this.fillForm(email, password, phone);
    await this.submit();
    await this.checkForErrors();
    await this.expectWelcomeMessage(email);
  }
}
