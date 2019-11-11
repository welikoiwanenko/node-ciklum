const request = require('supertest');
const chai    = require('chai');
const app     = require('../app.js');

const expect = chai.expect;

describe('GET /items', () => {
    it('Should return list of items', async () => {
        const response = await request(app)
            .get('/items')
            .expect(200);

        const { body } = response;

        expect(body).to.be.an('array');
        expect(body).to.have.lengthOf(2);
    })
});
