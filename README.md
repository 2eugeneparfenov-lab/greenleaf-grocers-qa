# GreenLeaf Grocers — QA Testing & Automation

A Quality Assurance portfolio project focused on testing an e-commerce application, with emphasis on guest checkout, promo code validation, and form validation.

The project demonstrates practical skills in **Manual Testing, Playwright Automation, API Testing, SQL Database Validation, and Defect Reporting**.

## Tech Stack

- **Test Automation:** Playwright, TypeScript
- **API Testing:** REST API, HTTP
- **Database Testing:** SQL, SQLite
- **Test Management:** Test Cases, Defect Reports
- **Version Control:** Git, GitHub

## Testing Coverage

| Feature | Testing Type |
|---|---|
| Guest Checkout | Functional / Happy Path |
| Checkout Without Login | Regression |
| Mobile Checkout | Responsive Testing |
| Promo Code Validation | Positive / Negative |
| Checkout Form Validation | Negative / Boundary Validation |
| Order Persistence | SQL Database Validation |

## Project Structure

```text
greenleaf-grocers-qa/
│
├── api_testing/
│   └── promo_validation.md
│
├── automation/
│   └── checkout.spec.ts
│
├── bug_reports/
│   ├── GL-B01-mobile-checkout.md
│   └── GL-B02-promo-api.md
│
├── evidence/
│   └── End-to-End_Portfolio.pdf
│
├── reports/
│   ├── bug_report_api_completed.html
│   └── bug_report_ui_completed.html
│
├── sql/
│   ├── verify_latest_guest_order.sql
│   └── verify_test_user.sql
│
├── test_cases/
│   ├── checkout-test-cases.md
│   ├── checkout-validation-test-cases.md
│   └── promo-test-cases.md
│
└── README.md
```

## Test Cases

Designed 10 test cases covering guest checkout, promotional discounts, and checkout form validation.

- [Checkout Test Cases](test_cases/checkout-test-cases.md)
- [Checkout Validation Test Cases](test_cases/checkout-validation-test-cases.md)
- [Promo Code Test Cases](test_cases/promo-test-cases.md)

The test cases include test objectives, steps, expected results, and priority.

## Playwright Test Automation

Prepared 9 Playwright test scenarios covering:

1. Successful Guest Checkout
2. Checkout Without Login
3. Mobile Checkout Button Accessibility
4. Valid Promo Code Application
5. Expired Promo Code API Validation
6. Checkout Without Name
7. Checkout Without Email
8. Invalid Email Validation
9. Checkout Without Address

**Automation file:** [checkout.spec.ts](automation/checkout.spec.ts)

The scripts use a local training environment. Test locators and test data must be verified against the running application before execution results can be reported.

## Bug Reports

Two defects were documented during the GreenLeaf Grocers training capstone.

### GL-B01 — Mobile Checkout Button Overlap

**Severity:** High

The Apply Promo button overlaps the Submit Order button on mobile viewports, potentially preventing users from completing checkout.

[View Bug Report](bug_reports/GL-B01-mobile-checkout.md)

### GL-B02 — Expired Promo Code Returns HTTP 500

**Severity:** High

An expired promo code causes an HTTP 500 Internal Server Error instead of a controlled validation response.

**Endpoint:** `POST /api/promo/validate`

**Expected:** HTTP 4xx with a validation message.

**Actual:** HTTP 500 Internal Server Error.

[View Bug Report](bug_reports/GL-B02-promo-api.md)

## API Testing

Performed negative API validation using the expired promo code `EXPIRED20`.

**Request:**

```http
POST /api/promo/validate
Content-Type: application/json
```

```json
{
  "code": "EXPIRED20"
}
```

**Actual Response:**

```json
{
  "error": {
    "code": "internal_error",
    "message": "Internal server error."
  }
}
```

**Result:** FAILED — HTTP 500 instead of an expected 4xx validation response.

[View API Test Report](api_testing/promo_validation.md)

## SQL Database Validation

SQL queries were prepared to verify application data after UI operations.

- [Verify Latest Guest Order](sql/verify_latest_guest_order.sql) — Retrieves the latest order associated with a test user.
- [Verify Test User](sql/verify_test_user.sql) — Checks whether the expected user exists in the database.

Database validation helps verify that frontend operations are correctly reflected in backend records.

## Test Reports & Evidence

Supporting documents from the training project:

- [API Bug Report](reports/bug_report_api_completed.html)
- [UI Bug Report](reports/bug_report_ui_completed.html)
- [End-to-End QA Portfolio (PDF)](evidence/End-to-End_Portfolio.pdf)

## Project Results

- Designed 10 structured test cases.
- Prepared 9 Playwright automation scenarios.
- Documented 2 high-severity defects.
- Investigated an HTTP 500 API validation failure.
- Used SQL for backend data verification.
- Completed a guest-checkout happy-path automation exercise in the original training environment.

**Note:** The training lab results are separate from the prepared 9-test automation suite. The complete suite has not yet been verified as passing.

## Project Purpose

This project was developed as part of hands-on QA training to demonstrate the software testing lifecycle, from test design and execution to defect investigation, automation, and reporting.
