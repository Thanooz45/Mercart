-- ==========================================
-- MERCART DATABASE SCHEMA SETUP FOR 'xpro'
-- ==========================================

-- Select the database
USE xpro;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255),
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Cart Table
CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product (user_id, product_id)
);

-- 4. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(100) NOT NULL DEFAULT 'Cash on Delivery',
    status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 5. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 6. Wishlist Table
CREATE TABLE IF NOT EXISTS wishlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_wishlist (user_id, product_id)
);

-- ==========================================
-- SEED SAMPLE PRODUCTS
-- ==========================================

-- Clear existing products first to avoid duplicates
DELETE FROM products;

INSERT INTO products (name, description, price, image, category) VALUES
('Classic Cotton T-Shirt', 'Breathable and 100% organic cotton basic t-shirt.', 499.00, 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500', 'Fashion'),
('Premium Running Shoes', 'Lightweight mesh running shoes with ergonomic sole support.', 2499.00, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', 'Sports'),
('Wireless Noise-Cancelling Headphones', 'Over-ear headphones with 30-hour battery life and deep bass.', 4999.00, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', 'Electronics'),
('Ergonomic Study Desk', 'Sturdy wooden desk with adjustable height and cable organizer.', 7999.00, 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500', 'Home'),
('Atomic Habits (Paperback)', 'An easy and proven way to build good habits and break bad ones.', 399.00, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500', 'Books'),
('Smart Fitness Tracker Band', 'Track heart rate, workouts, sleep stages, and active minutes.', 1999.00, 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500', 'Electronics'),
('Leather Backpack', 'Water-resistant vintage style travel laptop backpack.', 3499.00, 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500', 'Fashion'),
('Ceramic Coffee Mug Set', 'Set of 4 matte finish designer microwave safe mugs.', 899.00, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500', 'Home');
