import supertest from "supertest"
import app from "../app.js"


describe('POST /users', function () {
    it('should create a user', async function () {
        const res = await supertest(app)
            .post('/users')
            .send({
                name: 'User14',
                password: '1234',
                email: 'user14@gmail.com'
            })

            //check status and headers
            .expect(200)
            .expect('Content-Type', /json/);
    })
})