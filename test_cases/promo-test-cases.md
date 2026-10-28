# Promo Code — Test Cases (GL-102)

Scope: **Apply Promo Code at Checkout**, story `GL-102`.

## GL-TC-005 — Valid promo code adjusts the checkout total

| Field | Value |
| --- | --- |
| Type / priority | Functional · Positive / Medium |
| Status | Not executed; proposed test design |
| Preconditions | At least one item in cart; checkout loaded; an active promo code is available in test data |
| Test data | Obtain a valid promo code and its discount rule from the test environment |

**Steps**
1. Add a product to the cart and open checkout.
2. Record the original subtotal and total.
3. Enter a known valid promo code and select **Apply Promo**.
4. Compare the updated total with the configured promotion rule.

**Expected:** Valid promo is accepted, the discount is displayed and the order total matches the documented rule.  
**Note:** A specific active code/discount is not provided by the backlog; do not invent one.

## GL-TC-006 — Expired promo code receives controlled validation error

| Field | Value |
| --- | --- |
| Type / priority | API · Negative · Regression / High |
| Status | **Known defect:** [`GL-B02`](../bug-reports/GL-B02-promo-api.md) |
| Preconditions | GreenLeaf API available locally |
| Test data | `POST /api/promo/validate`, JSON `{"code":"EXPIRED20"}` |

**Steps**
1. Send a POST request to `/api/promo/validate` with the expired code.
2. Inspect HTTP status and JSON response.
3. Check that the client could display an understandable validation message.

**Expected:** A controlled client-error status (e.g. HTTP 400) and a useful invalid/expired-code message, not a server failure.  
**Recorded actual:** HTTP 500, `{"error":{"code":"internal_error","message":"Internal server error."}}`.
