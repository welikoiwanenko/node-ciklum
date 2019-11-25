const request = require('supertest');
const chai    = require('chai');
const app     = require('../../app.js');
const DB      = require('../../src/initializers/db');

const expect = chai.expect;

describe('POST /items', () => {
    let db;
    const item = {
        price: 200,
        name: 'Bread'
    };

    before(async () => {
        db = new DB();
    });

    after(async () => {
        await db.truncateDb();
    });

    it('Should create item', async () => {
        const response = await request(app)
            .post('/items')
            .set('authorization', 'admin')
            .send(item)
            .expect(201);

        const { body } = response;

        expect(body.id).to.exist;

        const itemFromDb = await db.getItem(body.id);
        expect(itemFromDb).to.eql(body);
    });

    it('Should return an error if user is not authorized', async () => {
        const response = await request(app)
            .post('/items')
            .send(item)
            .expect(401);

        const { body: { message } } = response;
        expect(message).to.equal('You are not allowed');
    })
});
