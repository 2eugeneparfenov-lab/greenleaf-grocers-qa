# API Test Report — Expired Promo Code Validation

**Project:** GreenLeaf Grocers  
**Test Type:** API / Negative Testing  
**Status:** FAILED  
**Severity:** High  
**Priority:** High

## Test Scenario

Verify that the API handles an expired promo code with a controlled validation error.

**Endpoint:** `POST /api/promo/validate`  
**Tool:** `api_probe.py` (local API probe)

**Request Body:**

```json
{
  "code": "EXPIRED20"
}
```

## Expected vs. Actual Results

| Expected Result | Actual Result |
|---|---|
| HTTP 4xx (e.g., 400) with a clear validation message | HTTP 500 Internal Server Error |

**Actual API Response:**

```json
{
  "error": {
    "code": "internal_error",
    "message": "Internal server error."
  }
}
```

## Steps to Reproduce

1. Start GreenLeaf Grocers on `localhost:3000`.
2. Send a POST request with promo code `EXPIRED20`.
3. Check the HTTP status code and response body.

## Conclusion

**FAILED** — The API incorrectly returns HTTP 500 for an expired promo code instead of a controlled validation error.

**Recommendation:** Return an appropriate 4xx status with a clear error message.

**Evidence:** `evidence/api_response.json`  
**Related Bug:** GL-B02 — Expired Promo Code Returns HTTP 500