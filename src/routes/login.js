const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Erro no servidor');
    }
});

module.exports = router;