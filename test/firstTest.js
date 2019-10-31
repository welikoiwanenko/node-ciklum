const request = require('supertest');

const routes = require('../app.js');

describe('GET /items', async () => {
    it('Should return list of items', async () => {
        const res = await request(routes).get('/items');
        console.log(res.body);
    })
});
