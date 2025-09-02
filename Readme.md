✅ Playwright Automation Solution

Welcome to the Playwright automation solution for testing a digital wallet web app.

📘 Please read this documentation carefully before using the solution.

📂 Project Structure

This project follows a clear and maintainable structure using the Page Object Model (POM):

```
├── tests/                     # Test specifications
│   ├── userRegistrationAndKyc.spec.ts
│   └── assets/               # Test assets (e.g., mock images)
│       └── validForUpload.jpg
├── pages/                    # Page Object Model definitions
│   ├── createAccountPage.ts
│   └── kycVerificationPage.ts
├── utils/                    # Helper utilities (data generators, API helpers)
│   ├── helpers.ts
│   └── apiHelpers.ts
├── .github/workflows/        # CI workflows (GitHub Actions)
│   └── tests.yml
├── playwright.config.ts      # Playwright configuration
├── .env                      # Environment variables (e.g., BASE_URL)
├── README.md                 # This documentation file
└── package.json              # Node.js project configuration
```

🧪 Tech Stack

This automation suite is built with:

✅ Playwright
 – Fast and reliable end-to-end testing

✅ TypeScript – Strong typing and scalability

✅ GitHub Actions – CI for automated test execution

✅ Dotenv – For managing environment variables like BASE_URL

⚙️ Prerequisites & Setup

💡 Make sure Node.js (v14+) is installed on your machine.

1. Clone the Repository
git clone https://github.com/ramzap/Playwright.git
cd Playwright

2. Install Dependencies
npm install

3. Install Playwright Browsers
npx playwright install

4. Create a .env File

In the root directory:

BASE_URL=http://localhost:3000


🔁 Update BASE_URL depending on your environment (e.g. local, staging, production).

5. (Optional) Install Playwright VS Code Extension

Install the Playwright Test for VS Code extension for improved debugging and test execution.

🚀 Running Tests
Run all tests (headless mode):
npx playwright test

Run tests in UI (headed) mode:
npx playwright test --headed

Run a specific test file:
npx playwright test tests/userRegistrationAndKyc.spec.ts

📊 HTML Report
To view the test report:
npx playwright show-report


Or open manually:

playwright-report/index.html

🔁 Continuous Integration (CI)

This project includes a CI workflow using GitHub Actions:

.github/workflows/tests.yml

The workflow will:

🕒 Run tests on every push or on a daily schedule

📎 Upload test reports as downloadable artifacts

🔄 Automatically start the mock KYC app if BASE_URL is not defined

✅ This makes it easier to test the full flow even without a running backend.
