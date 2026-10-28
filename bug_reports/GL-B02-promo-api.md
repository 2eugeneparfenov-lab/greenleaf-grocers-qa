# GL-B02 — Expired promo returns HTTP 500

| Field | Value |
| --- | --- |
| Type | Bug |
| Linked story | `GL-102` — Apply Promo Code at Checkout |
| Severity | **Critical in capstone release assessment** |
| Priority | **High / Release blocker** |
| Environment | GreenLeaf local API (`http://localhost:3000`) |
| Status | **Open in recorded capstone findings**; no fix confirmed |

## Steps to reproduce
1. Send `POST /api/promo/validate` with content type `application/json`.
2. Request body: `{"code":"EXPIRED20"}`.
3. Inspect the response.

**Expected:** A controlled **4xx** client error (e.g. 400) with an expired/invalid promo message.  
**Actual:** HTTP **500** and a generic server error:

```json
{"error":{"code":"internal_error","message":"Internal server error."}}
```

**Impact:** Expired codes are handled as internal server failures instead of user-facing validation errors.  
**Suggested action:** Handle expired codes in validation logic; return a documented 4xx error and add an API regression test.

**Related test case:** [`GL-TC-006`](../test-cases/promo-test-cases.md#gl-tc-006--expired-promo-code-receives-controlled-validation-error).  
**Evidence:** Original lab API probe output (`evidence/api_response.json`); do not share tokens or live credentials.
