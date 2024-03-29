CREATE USER IF NOT EXISTS 'ec'@'%' IDENTIFIED WITH mysql_native_password BY 'ec123';
CREATE DATABASE IF NOT EXISTS ec DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
GRANT ALL PRIVILEGES ON ec.* TO 'ec'@'%';

USE ec;

CREATE TABLE IF NOT EXISTS users (
    user_id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    email VARCHAR(100) NOT NULL UNIQUE,
    first_name NVARCHAR(50) NOT NULL,
    last_name NVARCHAR(50) NOT NULL,
    password_hash NVARCHAR(100) NOT NULL,
    street NVARCHAR(100),
    zip NVARCHAR(20),
    phone VARCHAR(20),
    is_admin BOOLEAN DEFAULT FALSE,
    city NVARCHAR(50),
    appartment NVARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BINARY(16),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by BINARY(16)
);

CREATE TABLE IF NOT EXISTS tokens (
  token varchar(100) PRIMARY KEY,
  user_id BINARY(16),
  token_type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS products (
    product_id BINARY(16) DEFAULT (UUID_TO_BIN(UUID())) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category_id BINARY(16),
    front_image VARCHAR(255) NOT NULL,
    back_image VARCHAR(255) NOT NULL,
    color VARCHAR(20) NOT NULL,
    created_by BINARY(16),
    updated_by BINARY(16),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES category(category_id)
);

CREATE TABLE IF NOT EXISTS inventories (
    inventory_id BINARY(16) DEFAULT (UUID_TO_BIN(UUID())) PRIMARY KEY,
    product_id BINARY(16) NOT NULL,
    quantity INT NOT NULL,
    size VARCHAR(10) NOT NULL,
    sku VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE IF NOT EXISTS category (
  category_id BINARY(16) DEFAULT (UUID_TO_BIN(UUID())) PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cart_item (
    cart_id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    session_id BINARY(16),
    product_id BINARY(16),
    inventory_id BINARY(16),
    quantity INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BINARY(16),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by BINARY(16),
    FOREIGN KEY (session_id) REFERENCES shopping_session(session_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (inventory_id) REFERENCES inventories(inventory_id)
);

CREATE TABLE IF NOT EXISTS shopping_session (
   session_id  BINARY(16) PRIMARY KEY DEFAULT uuid_to_bin(uuid()) NOT NULL,
   user_id     BINARY(16),
   total       DECIMAL(10)   DEFAULT 0 NOT NULL,
   created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP NOT NULL,
   created_by  BINARY(16),
   updated_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
   updated_by  BINARY(16),
   FOREIGN KEY (user_id) REFERENCES users(user_id)
);


