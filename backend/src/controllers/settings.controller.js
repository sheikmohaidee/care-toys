const pool = require('../config/db');

exports.getSettings = async (req, res) => {
    try {
        const [settings] = await pool.query('SELECT setting_key, setting_value FROM Settings');
        // Convert array to singular object mapping key->value iteratively
        const config = settings.reduce((acc, current) => {
            acc[current.setting_key] = current.setting_value;
            return acc;
        }, {});
        
        res.json({ success: true, data: config });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Analytics Error' });
    }
};

exports.updateSettings = async (req, res) => {
    const updates = req.body; // e.g., { whatsapp_number: '...', business_name: '...' }
    try {
        for (const [key, value] of Object.entries(updates)) {
            await pool.query(`
                INSERT INTO Settings (setting_key, setting_value) 
                VALUES (?, ?) 
                ON DUPLICATE KEY UPDATE setting_value = ?
            `, [key, value, value]);
        }
        res.json({ success: true, message: 'Global definitions updated securely.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Write Protocol Error' });
    }
};
