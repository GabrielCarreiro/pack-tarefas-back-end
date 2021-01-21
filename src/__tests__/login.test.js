const request = require('supertest');
const app = require('../app');

describe('exemplo', ()=>{
    it('Aqui', async ()=>{
        const response = await request(app).get('/')
        expect(response.body).toEqual(true)
    })
})
