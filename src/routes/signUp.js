const router = require('express').Router();
const pool = require('../db');

router.post('/', async (req, res) => {
    try {
    const { name, email, password, photo } = req.body;

    await pool.query('INSERT INTO users (name, email, password, photo) VALUES ($1, $2, $3, $4 ) RETURNING *',
    [name, email, password , photo]);

    return res.status(201).json('Cadastrado com sucesso')

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Erro no servidor');
    }
});
module.exports = router;