const pool = require('../config/db');

async function initializeDatabase() {
  try {
    const queries = [
      `CREATE TABLE IF NOT EXISTS Users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, role ENUM('user', 'admin') DEFAULT 'user', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`,
      `CREATE TABLE IF NOT EXISTS Categories (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, slug VARCHAR(255) NOT NULL UNIQUE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`,
      `CREATE TABLE IF NOT EXISTS Products (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, description TEXT, price DECIMAL(10, 2) NOT NULL, stock INT NOT NULL DEFAULT 0, category_id INT, image_url VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (category_id) REFERENCES Categories(id) ON DELETE SET NULL)`,
      `CREATE TABLE IF NOT EXISTS Orders (id INT AUTO_INCREMENT PRIMARY KEY, user_id INT NOT NULL, total_amount DECIMAL(10, 2) NOT NULL, status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE)`,
      `CREATE TABLE IF NOT EXISTS OrderItems (id INT AUTO_INCREMENT PRIMARY KEY, order_id INT NOT NULL, product_id INT NOT NULL, quantity INT NOT NULL, price DECIMAL(10, 2) NOT NULL, FOREIGN KEY (order_id) REFERENCES Orders(id) ON DELETE CASCADE, FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE)`,
      `CREATE TABLE IF NOT EXISTS CartItems (id INT AUTO_INCREMENT PRIMARY KEY, user_id INT NOT NULL, product_id INT NOT NULL, quantity INT NOT NULL DEFAULT 1, FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE, FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE)`,
      `CREATE TABLE IF NOT EXISTS Coupons (id INT AUTO_INCREMENT PRIMARY KEY, code VARCHAR(50) NOT NULL UNIQUE, discount_percentage INT NOT NULL, valid_until DATETIME NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`,
      `CREATE TABLE IF NOT EXISTS Deals (id INT AUTO_INCREMENT PRIMARY KEY, product_id INT NOT NULL, discount_price DECIMAL(10, 2) NOT NULL, valid_until DATETIME NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE)`,
      `CREATE TABLE IF NOT EXISTS Drops (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, description TEXT, launch_date DATETIME NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`
    ];

    for (let query of queries) await pool.query(query);
    console.log('Database tables initialized successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  initializeDatabase();
}

module.exports = initializeDatabase;
