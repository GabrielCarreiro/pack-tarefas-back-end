const request = require('supertest');
const app = require('../app');

describe('Buscar usuários', ()=>{
    it('Testanto a busca de usuários na rota /users ', async ()=>{
        const data =  {
            id_user: 1,
            name: 'Carlos Almeida',
            photo: 'https://engenharia360.com/wp-content/uploads/2019/05/esta-pessoa-nao-existe-engenharia360-4.png'
        }
        const response = await request(app).get('/users')
        expect(response.body[0]).toEqual(data)
        expect(response.status).toBe(200)
    })
})

describe('Cadastrando usuários', ()=>{
    it('Testanto o cadastro de um novo cliente na rota /singUp ', async ()=>{
        const data = {
            "email": "Pedro@fiscal.com",
            "name": "Pedro Ribeiro",
            "password": "123456",
            "photo":"https://p0.pikist.com/photos/235/662/business-meeting-people-corporate-success-person-professional.jpg"
        }
        const response = await request(app).post('/singUp').send(data)
        expect(response.status).toBe(201)
    })
})

