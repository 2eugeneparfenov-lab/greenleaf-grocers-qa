-- QA precondition check: confirm the expected test guest exists in SQLite.
-- Expected: a matching test user row (if the application persists guests in users).
-- Run after the guest checkout when using this capstone setup.
SELECT id, email
FROM users
WHERE email = 'capstone.guest@example.test';
