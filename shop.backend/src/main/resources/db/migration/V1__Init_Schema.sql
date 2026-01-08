-- 1. USERS TABLE
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone VARCHAR(20),
    role VARCHAR(50) NOT NULL DEFAULT 'USER',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. ADDRESS TABLE
CREATE TABLE address (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100) NOT NULL
);

-- 3. ANIMAL TABLE
CREATE TABLE animal (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- 4. CATEGORY TABLE
CREATE TABLE category (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    parent_id BIGINT,
    CONSTRAINT fk_category_parent FOREIGN KEY (parent_id) REFERENCES category(id)
        ON DELETE CASCADE
);

-- 5. PRODUCT TABLE
CREATE TABLE product (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    descriptif TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    image_url VARCHAR(500),
    category_id BIGINT,
    animal_id BIGINT,
    CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES category(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    CONSTRAINT fk_product_animal FOREIGN KEY (animal_id) REFERENCES animal(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- 6. ORDERS TABLE
CREATE TABLE `orders` (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'PENDING',
    total DECIMAL(10,2) DEFAULT 0.00,
    address_id BIGINT,
    user_id BIGINT,
    CONSTRAINT fk_orders_address FOREIGN KEY (address_id) REFERENCES address(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- 7. ORDER ITEMS TABLE
CREATE TABLE order_item (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    CONSTRAINT fk_order_item_order FOREIGN KEY (order_id) REFERENCES `orders`(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_order_item_product FOREIGN KEY (product_id) REFERENCES product(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- 8. CART ITEM TABLE
CREATE TABLE cart_item (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cart_item_user FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_cart_item_product FOREIGN KEY (product_id) REFERENCES product(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT uk_cart_user_product UNIQUE (user_id, product_id)
);

-- 9. FAVORITE TABLE
CREATE TABLE favorite (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_favorite_user FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_favorite_product FOREIGN KEY (product_id) REFERENCES product(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT uk_favorite_user_product UNIQUE (user_id, product_id)
);

ALTER TABLE `orders` ADD COLUMN payment_id VARCHAR(255);