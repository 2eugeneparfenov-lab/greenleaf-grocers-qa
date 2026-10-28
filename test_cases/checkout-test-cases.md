# Checkout — Test Cases (GL-101)

Scope: **Guest Checkout Without Account**, story `GL-101`. IDs below are portfolio-only. The application base URL in the lab is `http://localhost:3000`.

## GL-TC-001 — Guest checkout with valid data

| Field | Value |
| --- | --- |
| Type / priority | E2E · Happy path · Smoke / High |
| Status | **Passed (lab)** — Playwright output showed 1 passed |
| Preconditions | App running; catalog displays products; cart initially empty |
| Test data | Name: `QA Guest`; Email: `capstone.guest@example.test`; Address: `123 Test Street` |

**Steps**
1. Open `/` and wait for the product catalog.
2. Add one available product to the cart.
3. Open the cart and proceed to checkout.
4. Enter valid name, email and address. Leave promo code blank.
5. Select **Submit Order**.

**Expected:** Success section is displayed and a non-empty order ID is visible.  
**Recorded result:** Passed in the lab Playwright run.  
**Automation reference:** `tests/checkout.spec.js` from the lab (not bundled in this documentation pack).

## GL-TC-002 — Guest can check out without logging in

| Field | Value |
| --- | --- |
| Type / priority | Functional · Regression / High |
| Status | Not executed as a separate case; guest flow included in GL-TC-001 |
| Preconditions | New browser session; user is not signed in; product is in cart |

**Steps**
1. Open the cart without authenticating.
2. Proceed to checkout.
3. Enter valid delivery details and submit an order.

**Expected:** An account/login prompt does not block checkout and the order completes successfully.

## GL-TC-003 — Order is persisted in SQLite after guest checkout

| Field | Value |
| --- | --- |
| Type / priority | Database · Integration / High |
| Status | **Passed (lab)** — SQL query returned one order row |
| Preconditions | GL-TC-001 has completed; SQLite database is accessible |
| Test data | `capstone.guest@example.test` |

**Steps**
1. Complete the valid guest checkout with the required email.
2. Execute [`../sql/verify_latest_guest_order.sql`](../sql/verify_latest_guest_order.sql).
3. Compare the row with the guest account and resulting checkout.

**Expected:** The newest order is associated with that email and was persisted after checkout.  
**Recorded result:** An order row was returned in the lab; refer to the original `sql_result.txt` for exact values.

## GL-TC-004 — Checkout submit remains usable at mobile width

| Field | Value |
| --- | --- |
| Type / priority | Responsive UI · Regression / Critical |
| Status | **Known defect:** [`GL-B01`](../bug-reports/GL-B01-mobile-checkout.md) |
| Preconditions | Product in cart; checkout page open; Chrome DevTools available |
| Test data | Viewport `390 × 844`, representative width below 768 px |

**Steps**
1. Open checkout and enable mobile device emulation.
2. Set the viewport to 390 × 844.
3. Scroll to promo code and order summary controls.
4. Check whether **Apply Promo** and **Submit Order** are both fully accessible.

**Expected:** Buttons do not overlap or block checkout.  
**Recorded actual:** Apply Promo overlaps Submit Order at narrow widths and obstructs normal interaction.
