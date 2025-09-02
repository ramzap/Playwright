import { expect, Locator, Page } from '@playwright/test';

export class KycVerificationPage {
  readonly page: Page;
  readonly fileInput: Locator;
  readonly submitButton: Locator;
  readonly kycStatus: Locator;
  readonly successMessage: Locator;
  readonly documentList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fileInput = page.locator('input[type="file"]');
    this.submitButton = page.getByRole('button', { name: /submit/i });
    this.kycStatus = page.locator('.status.valid');
    this.successMessage = page.locator('.alert.alert-success');
    this.documentList = page.locator('.alert.alert-info'); // multiple entries possible
  }

  async uploadDocument(filePath: string, userId: string) {
    await this.fileInput.setInputFiles(filePath);

    const maxWaitTime = 20000; // max wait 20 seconds
    const pollInterval = 1000; // poll every 1 second
    const startTime = Date.now();

    while (true) {
      const response = await this.page.request.get(`/api/kyc/${userId}`);

      if (response.status() !== 200) {
        throw new Error(`❌ KYC API returned status ${response.status()}`);
      }

      const body = await response.json();
      const { documents, kycStatus } = body.data;

      if (!Array.isArray(documents) || documents.length === 0) {
        throw new Error('❌ No documents found in KYC response');
      }

      console.log(`ℹ️ Current KYC status: ${kycStatus}, documents count: ${documents.length}`);

      if (kycStatus === 'valid' || kycStatus === 'invalid') {
        console.log(`✅ Final KYC status: ${kycStatus}`);
        break;
      }

      if (Date.now() - startTime > maxWaitTime) {
        throw new Error('❌ Timed out waiting for KYC status to update');
      }

      await new Promise(r => setTimeout(r, pollInterval));
    }
  }

  async expectKycSuccessUI() {
    await expect(this.kycStatus).toHaveText(/document verified successfully/i);

    const successAlert = this.page.locator('div.alert.alert-success', { hasText: 'KYC Verification Complete!' });
    await expect(successAlert).toBeVisible();

    const validDoc = this.documentList.filter({ hasText: 'Status: valid' });
    await expect(validDoc).toContainText('File:');
  }
}
