require('dotenv').config();
const pool = require('./src/config/db');

async function update() {
    try { await pool.query('ALTER TABLE Orders ADD COLUMN customer_name VARCHAR(255);'); } catch(e){}
    try { await pool.query('ALTER TABLE Orders ADD COLUMN customer_phone VARCHAR(20);'); } catch(e){}
    try { await pool.query('ALTER TABLE Orders ADD COLUMN customer_address TEXT;'); } catch(e){}
    try { await pool.query('ALTER TABLE Orders ADD COLUMN customer_city VARCHAR(100);'); } catch(e){}
    
    try {
        await pool.query(`CREATE TABLE IF NOT EXISTS Settings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            setting_key VARCHAR(50) UNIQUE NOT NULL,
            setting_value TEXT
        );`);
        
        await pool.query(`INSERT IGNORE INTO Settings (setting_key, setting_value) VALUES 
            ('whatsapp_number', '918015293181'), 
            ('business_name', 'Care Toys Phase 2'), 
            ('currency', 'INR');`);
    } catch(e) {
        console.error("Settings Table Error:", e);
    }
    
    console.log('CRM Database structures completed initialization.');
    process.exit(0);
}
update();
