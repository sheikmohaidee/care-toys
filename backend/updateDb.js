require('dotenv').config();
const pool = require('./src/config/db');

async function update() {
    try { await pool.query('ALTER TABLE Products ADD COLUMN isLimited BOOLEAN DEFAULT FALSE;'); } catch(e){}
    try { await pool.query('ALTER TABLE Products ADD COLUMN isDeal BOOLEAN DEFAULT FALSE;'); } catch(e){}
    try { await pool.query('ALTER TABLE Products ADD COLUMN isCollector BOOLEAN DEFAULT FALSE;'); } catch(e){}
    
    try { await pool.query('DROP TABLE IF EXISTS Coupons;'); } catch(e){}
    try { 
        await pool.query(`CREATE TABLE Coupons (
            id INT AUTO_INCREMENT PRIMARY KEY, 
            code VARCHAR(50) NOT NULL UNIQUE, 
            discount_type ENUM('percentage', 'fixed') NOT NULL DEFAULT 'percentage', 
            discount_value DECIMAL(10, 2) NOT NULL, 
            expiry_date DATE, 
            title VARCHAR(255), 
            description TEXT, 
            bg_color VARCHAR(50), 
            badge_text VARCHAR(50), 
            image_url VARCHAR(255), 
            is_active BOOLEAN DEFAULT TRUE, 
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`); 
    } catch(e) {
        console.error("Coupon Table Error:", e);
    }
    console.log('Database updated successfully');
    process.exit(0);
}
update();
