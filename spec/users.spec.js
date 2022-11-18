
import supertest from "supertest"
import app from "../app.js"
import mongoose from 'mongoose'
import { cleanUpDatabase } from "./utils.js"
import User from "../model/User.js"
import { generateValidJwt } from "./utils.js"


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
//POST test--------------------------------------------------------

describe('POST /users', function () {
  it('should create a user', async function () {
    const res = await supertest(app)
      .post('/users')
      .send({
        name: 'Jane Darc',
        password: '1234',
        email: 'JaneDarc@gmail.com'
      })

      //check status and headers
      .expect(200)
      .expect('Content-Type', /json/);
    // expect.objectContaining({
    //   _id: expect.any(String),
    //   name: 'Jane Darc',
    //   email: 'JaneDarc@gmail.co'
    // })
    expect(res.body).toBeObject();
    expect(res.body._id).toBeString();
    expect(res.body.name).toEqual('Jane Darc');
    expect(res.body.email).toEqual('JaneDarc@gmail.com');
    expect(res.body).toContainAllKeys(['_id', 'name', 'email'])
  })
})

//GET test--------------------------------------------------------
//all users
describe('GET /users', function () {
  //Start here
  let newUser;
  beforeEach(async function() {
    // Create 2 users before retrieving the list.
    const users = await Promise.all([
      User.create({ name: 'Mardin Pecheur', password: '1234', email :'mardin@heig.ch'}),
      User.create({ name: 'Linda Aichar', password: '1234', email:'linda@heig.ch'})
    ]);
    newUser=users[0];
  })

  test('should retrieve the list of users', async function () {
    const token = await generateValidJwt(newUser)
    const res = await supertest(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'test',
        email:'test@gmail.com'
    })
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).toBeArray();
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toBeObject();
    expect(res.body[0]._id).toBeString();
    expect(res.body[0].name).toEqual('Mardin Pecheur');
    expect(res.body[0].email).toEqual('mardin@heig.ch');
    expect(res.body[0]).toContainAllKeys(['_id', 'name', 'email']);

    expect(res.body[1]).toBeObject();
    expect(res.body[1]._id).toBeString();
    expect(res.body[1].name).toEqual('Linda Aichar');
    expect(res.body[1].email).toEqual('linda@heig.ch');
    expect(res.body[1]).toContainAllKeys(['_id', 'name', 'email']);
  });
});

//PATCH test--------------------------------------------------------

describe('PATCH /users', function () {
  //Start here
  let newUser;
  beforeEach(async function() {
    // Create 2 users before retrieving the list.
    const users = await Promise.all([
      User.create({ name: 'Kass Andra', password: '1234', email :'kass@heig.ch'}),
      User.create({ name: 'Maia Labeil', password: '1234', email:'maia@heig.ch'})
    ]);
    newUser=users[0];
  })

  test('should patch a user', async function () {
    const token = await generateValidJwt(newUser)
    const res = await supertest(app)
      .patch('/users/'+newUser._id)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'test',
        email:'test@gmail.com'
    })
      .expect(200)
      .expect('Content-Type', /json/);
      expect(res.body).toBeObject();
      expect(res.body._id).toBeString();
      expect(res.body.name).toEqual('test');
      expect(res.body.email).toEqual('test@gmail.com');
      expect(res.body).toContainAllKeys(['_id', 'name', 'email']);
  })
})



//DELETE test--------------------------------------------------------

describe('DELETE /users', function () {
  let newUser;
  beforeEach(async function() {
    // Create 2 users before retrieving the list.
    const users = await Promise.all([
      User.create({ name: 'Sahra Ahara', password: '1234', email :'sahra@heig.ch'}),
      User.create({ name: 'Salima Ahara', password: '1234', email :'salima@heig.ch'})
    ]);
    newUser=users[0];
  })


  it('should delete a user', async function () {
    const token = await generateValidJwt(newUser)
    const res = await supertest(app)
      .delete('/users/'+newUser._id)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Sahra Ahara',
        email:'sahra@heig.ch'
    })
      //check status and headers
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body).toBeObject();
    expect(res.body._id).toBeString();
    expect(res.body.name).toEqual('Sahra Ahara');
    expect(res.body.email).toEqual('sahra@heig.ch');
    expect(res.body).toContainAllKeys(['_id', 'name', 'email'])
  })
})


afterAll(async () => {
  await mongoose.disconnect();
});

