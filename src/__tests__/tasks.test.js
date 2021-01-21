const request = require('supertest');
const app = require('../app');

describe('Buscar tarefas', ()=>{
    it('Testanto a busca de tarefas na rota /tasks ', async ()=>{
        const response = await request(app).get('/tasks')
        expect(response.status).toBe(200)
    })
})

describe('Cadastrar tarefas', ()=>{
    it('Testanto o cadastro de uma nova tarefas na rota /tasks ', async ()=>{
        const data = {
            "user": 1,
            "task": "teste",
            "type": "Relatorio",
            "term": "30/02/2021",
            "status": "Concluido",
            "requester": 2
        }
        const response = await (await request(app).post('/tasks').send(data))
        expect(response.status).toBe(201)
    })
})

describe('Cadastrar tarefas', ()=>{
    it('Testanto o cadastro de uma nova tarefas na rota /tasks ', async ()=>{
        const data = {
            "user": 1,
            "task": "teste",
            "type": "Relatorio",
            "term": "30/02/2021",
            "status": "Concluido",
            "requester": 2
        }
        const response = await (await request(app).put('/tasks/1').send(data))
        expect(response.status).toBe(200)
    })
})

