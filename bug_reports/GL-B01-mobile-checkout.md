# GL-B01 — Apply Promo overlaps Submit Order on mobile

| Field | Value |
| --- | --- |
| Type | Bug |
| Linked story | `GL-102` (promo UI), impacts `GL-101` (checkout) |
| Severity | **Critical** — can block purchase completion |
| Priority | **High / Release blocker** |
| Environment | GreenLeaf Grocers; Chrome DevTools emulation; checkout; width `390 px` (<768 px) |
| Status | **Open in recorded capstone findings**; no fix confirmed |

## Steps to reproduce
1. Add any product to cart and open `/checkout`.
2. In Chrome DevTools, set the device viewport to **390 × 844**.
3. Scroll to the promo and order summary area.

**Expected:** **Apply Promo** and **Submit Order** are separate, visible, and clickable.  
**Actual:** **Apply Promo** overlaps **Submit Order**, obstructing checkout submission at narrow widths.

**Impact:** Affected mobile shoppers may be unable to complete purchase.  
**Suggested action:** Fix responsive layout below 768 px; retest across representative mobile widths.

**Related test case:** [`GL-TC-004`](../test-cases/checkout-test-cases.md#gl-tc-004--checkout-submit-remains-usable-at-mobile-width).  
**Evidence:** Original lab UI reproduction / Jira-style ticket screenshot (add `evidence/bug_report_ui.png` if available).
