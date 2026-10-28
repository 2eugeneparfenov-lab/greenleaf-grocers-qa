# Checkout Form Validation — Test Cases (GL-103)

Scope: **Checkout Form Validation**, story `GL-103`. These are **proposed, not executed** scenarios based on the story's acceptance criterion that required fields must be validated.

## GL-TC-007 — Required customer name is missing

| Field | Value |
| --- | --- |
| Type / priority | Negative · Validation / Medium |
| Status | Not executed |
| Preconditions | Product in cart; checkout open |

**Steps:** Fill valid email and address, leave **Name** empty, then select **Submit Order**.  
**Expected:** Submission is blocked; a clear required-name validation message appears; no order is created.

## GL-TC-008 — Required email is missing

| Field | Value |
| --- | --- |
| Type / priority | Negative · Validation / High |
| Status | Not executed |
| Preconditions | Product in cart; checkout open |

**Steps:** Enter valid name and address, leave **Email** empty, then select **Submit Order**.  
**Expected:** Submission is blocked; a clear required-email validation message appears; no order is created.

## GL-TC-009 — Invalid email format

| Field | Value |
| --- | --- |
| Type / priority | Negative · Validation / Medium |
| Status | Not executed; expected behavior to confirm against requirements |
| Preconditions | Product in cart; checkout open |
| Test data | `invalid-email` |

**Steps:** Enter name and address, provide the invalid email, and select **Submit Order**.  
**Expected:** Email format is rejected before order creation, with a clear validation message.  
**Note:** This extends the supplied required-field criterion; confirm the exact email-format rule with the product owner.

## GL-TC-010 — Required shipping address is missing

| Field | Value |
| --- | --- |
| Type / priority | Negative · Validation / High |
| Status | Not executed |
| Preconditions | Product in cart; checkout open |

**Steps:** Enter valid name and email, leave **Address** empty, then select **Submit Order**.  
**Expected:** Submission is blocked; a clear required-address validation message appears; no order is created.
