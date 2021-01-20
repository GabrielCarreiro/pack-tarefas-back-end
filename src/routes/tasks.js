const router = require('express').Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM tasks INNER JOIN users ON id_user = user_id');
        return res.json(results.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Erro no servidor');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const results = await pool.query('SELECT * FROM users INNER JOIN tasks ON id_user = $1  and user_id = $1 ', [id]);
        return res.json(results.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Erro no servidor');
    }
});

router.post('/', async (req, res) => {
    try {
        const { user, task, type, term, status, requester } = req.body;

        await pool.query('INSERT INTO tasks (user_id, task, type, term, status, requester ) VALUES ($1, $2, $3, $4, $5, $6 ) RETURNING *',
        [user, task, type, term, status, requester ]);
    
        return res.status(201).json('Cadastrado com sucesso')
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Erro no servidor');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;

        await pool.query('UPDATE tasks SET status = $2 WHERE id = $1 RETURNING *',
        [id, status]);
        
        return res.status(200).json('Tarefa atualizada com sucesso.')
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Erro no servidor');
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;

        await pool.query('DELETE from tasks where id = $1 RETURNING *',
        [id]);
        
        return res.status(200).json('Deletado com sucesso.')
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Erro no servidor');
    }
});

router.post('/delete/all', async (req, res) => {
    try {
        const  results  = req.body;
        console.log(results)

        results.map( async (task) =>{
            await pool.query('DELETE from tasks where id = $1 RETURNING *',
            [task.id]);
        })
        
        return res.status(200).json('Deletado com sucesso.')
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Erro no servidor');
    }
});

router.put('/all/completed', async (req, res) => {
    try {
        const  results  = req.body;
        results.map( async (task) =>{
            await pool.query('UPDATE tasks SET status = $2 WHERE id = $1 RETURNING *',
            [task.id, "Concluido"]);
        })
        return res.status(200).json('Tarefas atualizada com sucesso.')
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Erro no servidor');
    }
});

router.put('/all/progress', async (req, res) => {
    try {
        const  results  = req.body;
        results.map( async (task) =>{
            await pool.query('UPDATE tasks SET status = $2 WHERE id = $1 RETURNING *',
            [task.id, "Em andamento"]);
        })
        return res.status(200).json('Tarefas atualizada com sucesso.')
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Erro no servidor');
    }
});

router.put('/all/pending', async (req, res) => {
    try {
        const  results  = req.body;
        await results.map( async (task) =>{
            await pool.query('UPDATE tasks SET status = $2 WHERE id = $1 RETURNING *',
            [task.id, "Em andamento"]);
        })
        return res.status(200).json('Tarefas atualizada com sucesso.')
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Erro no servidor');
    }
});
module.exports = router;