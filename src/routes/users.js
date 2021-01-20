const router = require('express').Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const results = await pool.query('SELECT id_user, name, photo FROM users');
        return res.json(results.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Erro no servidor');
    }
});

module.exports = router;