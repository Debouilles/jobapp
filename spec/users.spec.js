
import supertest from "supertest"
import app from "../app.js"
import mongoose from 'mongoose'
import { cleanUpDatabase } from "./utils.js"


//Functions------



// Log requests (except in test mode).
if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'));
  }

// empty db
// exports.cleanUpDatabase = async function() {
//     await Promise.all([
//       User.deleteMany()
//     ]);
//   };

  beforeEach(cleanUpDatabase);
  //Tests----------------------------

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


afterAll(async () => {
    await mongoose.disconnect();
  });

