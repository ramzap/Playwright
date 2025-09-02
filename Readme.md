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

✅ Playwright <br>
 – Fast and reliable end-to-end testing

✅ TypeScript – Strong typing and scalability <br>

✅ GitHub Actions – CI for automated test execution <br>

✅ Dotenv – For managing environment variables like BASE_URL <br>

⚙️ Prerequisites & Setup <br>

💡 Make sure Node.js (v14+) is installed on your machine. <br>

1. Clone the Repository <br>
git clone https://github.com/ramzap/Playwright.git  <br>
```cd Playwright```

2. Install Dependencies  <br>
```npm install```

3. Install Playwright Browsers  <br>
```npx playwright install```

4. Create a .env File <br>

In the root directory: <br>

```BASE_URL=http://localhost:3001```


🔁 Update BASE_URL depending on your environment (e.g. local, staging, production). <br>

5. (Optional) Install Playwright VS Code Extension  <br>

```Install the Playwright Test for VS Code extension for improved debugging and test execution.```

🚀 Running Tests <br>
Run all tests (headless mode): <br>
```npx playwright test```

Run tests in UI (headed) mode: <br>
```npx playwright test --headed```

Run a specific test file: <br>
```npx playwright test tests/userRegistrationAndKyc.spec.ts```

📊 HTML Report <br>
To view the test report: <br>
```npx playwright show-report```


Or open manually: <br>

```playwright-report/index.html```

🔁 Continuous Integration (CI) <br>

This project includes a CI workflow using GitHub Actions: <br>

```.github/workflows/tests.yml```

The workflow will: <br>

🕒 Run tests on every push or on a daily schedule <br>

📎 Upload test reports as downloadable artifacts <br>

🔄 Automatically start the mock KYC app if BASE_URL is not defined <br>

✅ This makes it easier to test the full flow even without a running backend.
