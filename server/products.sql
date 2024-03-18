-- Inserting into `users` table
INSERT INTO users(first_name, last_name, email, password, created_at, updated_at) 
VALUES ('Alice', 'Johnson', 'alice.johnson@example.com', 'hashed_password123', NOW(), NOW());

-- Assuming the user Alice Johnson gets an ID of 1
-- Inserting into `products` table for books
INSERT INTO products(title, description, price, image_url, created_at, updated_at) 
VALUES ('The Great Gatsby', 'A portrait of the Jazz Age in all of its decadence and excess, The Great Gatsby captured the spirit of the author''s generation and earned itself a permanent place in American mythology. Self-made, self-invented millionaire Jay Gatsby embodies some of Fitzgerald’s—and his country’s—most abiding obsessions: money, ambition, greed, and the promise of new beginnings.', 12.99, 'http://example.com/images/thegreatgatsby.jpg', NOW(), NOW());

-- Assuming The Great Gatsby gets a product ID of 1
-- Inserting into `ratings` table
INSERT INTO ratings(rating, product_id, created_at, updated_at) 
VALUES (4.5, 1, NOW(), NOW());

-- Inserting into `carts` table
INSERT INTO carts(user_id, payed, created_at, updated_at) 
VALUES (1, FALSE, NOW(), NOW());

-- Assuming the cart gets an ID of 1
-- Inserting into `cart_rows` table linking a product to a cart with quantity
INSERT INTO cart_rows(cart_id, product_id, amount, created_at, updated_at) 
VALUES (1, 1, 1, NOW(), NOW());