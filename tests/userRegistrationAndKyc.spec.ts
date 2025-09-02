import { test, expect } from '@playwright/test';
import { CreateAccountPage } from '../pages/createAccountPage';
import { generateRandomEmail, generateRandomPhone, randomPassword } from '../utils/helpers';
import { KycVerificationPage } from '../pages/kycVerificationPage';

let randomEmail: string;
let randomPhone: string;
let password: string;
let createAccount: CreateAccountPage;
let kycVerificationPage: KycVerificationPage;

test.describe('Tests suite', () => {

test.beforeEach( ({ page }) => {
  randomEmail = generateRandomEmail();
  randomPhone = generateRandomPhone();
  password = randomPassword();
  createAccount = new CreateAccountPage(page);
  kycVerificationPage = new KycVerificationPage(page);
});

test('@TC01: Valid User Registration', async ({ page }) => {
  await test.step('Navigate to registration page and fill form', async () => {
    await page.goto('/');
    await createAccount.fillForm(randomEmail, password, randomPhone);
  });

  await test.step('Submit registration form', async () => {
    await createAccount.submit();
  });

  await test.step('Check for errors and welcome message', async () => {
    await createAccount.checkForErrors();
    await createAccount.expectWelcomeMessage(randomEmail);
  });
});

test('@TC05: KYC Document Upload Success', async ({ page }) => {
  await test.step('Register and verify user', async () => {
    await createAccount.registerAndVerify(randomEmail, password, randomPhone);
  });

  await test.step('Upload KYC document', async () => {
    await kycVerificationPage.uploadDocument('tests/assets/validForUpload.jpg', createAccount.userId);
  });

  await test.step('Verify KYC status message shows "Document verified successfully"', async () => {
    await expect(kycVerificationPage.kycStatus).toHaveText(/document verified successfully/i);
  });

  await test.step('Verify success alert "KYC Verification Complete!" is visible', async () => {
    const successAlert = kycVerificationPage.page.locator('div.alert.alert-success', { hasText: 'KYC Verification Complete!' });
    await expect(successAlert).toBeVisible();
  });

  await test.step('Verify uploaded document with status "valid" is present', async () => {
    const validDoc = kycVerificationPage.documentList.filter({ hasText: 'Status: valid' });
    await expect(validDoc).toContainText('File:');
  });
});
});
