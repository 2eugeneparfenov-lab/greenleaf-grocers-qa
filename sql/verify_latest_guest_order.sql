-- GL-TC-003 | Backend persistence after guest checkout
-- Execute against the local GreenLeaf SQLite database.
-- Expected: the newest persisted order for the test guest is returned.
-- No row indicates missing test data or a checkout/persistence problem.
SELECT orders.*, users.email
FROM orders
JOIN users ON orders.user_id = users.id
WHERE users.email = 'capstone.guest@example.test'
ORDER BY orders.created_at DESC
LIMIT 1;
