# SauceDemo Playwright UI Automation — Assignment 3

**Name:** <Mir Ali Shaikh>
**Student ID:** <se231073>

## How to run the tests

```bash
npm install
npx playwright install
npm test
```

(After running, view the HTML report with `npm run report`.)

## Project structure

```
.
├── pages/
│   └── LoginPage.ts          # Page Object Model for the login page (Part B)
├── tests/
│   ├── partA.basics.spec.ts  # Part A: 6 core automation scenarios
│   └── partB.pom-login.spec.ts # Part B: positive/negative login tests using LoginPage
├── playwright.config.ts
├── package.json
└── README.md
```

## What's covered

**Part A — Automation Basics**
1. Login with valid credentials → lands on inventory page
2. Login with invalid password → error message visible
3. Add 2 items to cart → cart badge shows `2`
4. Complete checkout → "Thank you for your order!" visible
5. Logout → redirected to login page
6. Sort by Price (Low to High) → first price lower than last

**Part B — Page Object Model**
- `LoginPage` class with `goto()` and `login(username, password)` methods
- One positive and one negative login test, both using `LoginPage` (no raw locators in the test file)
