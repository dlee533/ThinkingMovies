const request = require('supertest')(require('../app'));
const { expect } = require('chai');
const resource = '/API/v1';

// app.get(resource + '/movies', movieController.getAllMovies);
//
// app.post(resource + '/users/:uid/bucketlist/:bid', movieController.addMovies);
before(() => {
  require('../migration');
})
describe(`ADMINS`, () => {
  let apiKey;

  describe('POST /adminLogin', () => {
    it ('should login admin', async () => {
      const res = await request.post(resource + '/adminLogin')
                               .set({ ContentType: "application/json" })
                               .send({
                                 username: "admin",
                                 password: "1234abcd"
                               })

      expect(res.statusCode).to.equal(200);
      expect(res.body.apiKey).to.be.a('string');
      apiKey = res.body.apiKey;
    });

    it ('should fail to login admin with incorrect password', async () => {
      const res = await request.post(resource + '/adminLogin')
                               .send({
                                 email: "admin",
                                 password: "incorrectPassword"
                               });

      expect(res.statusCode).to.not.equal(200);
    });
  });

  describe('GET /admins/stats', () => {
    it ('should get stats', async () => {
      const res = await request.get(resource + '/admins/stats')
                               .set({ Authorization: `Basic ${apiKey}` })
                               .send()

      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property('stats');
    });

    it ('should fail to get stats', async () => {
      const res = await request.get(resource + '/admins/stats')
                               .set({ Authorization: `Basic invalidAPIKey` })
                               .send()

      expect(res.statusCode).to.not.equal(200);
    });
  })

  describe('GET /admins/verify', () => {
    it ('should verify', async () => {
      const res = await request.get(resource + '/admins/verify')
                               .set({ Authorization: `Basic ${apiKey}` })
                               .send()

      expect(res.statusCode).to.equal(200);
      expect(res.body.success).to.be.true;
    });

    it ('should fail to verify', async () => {
      const res = await request.get(resource + '/admins/verify')
                               .set({ Authorization: `Basic invalidAPIKey` })
                               .send()

      expect(res.statusCode).to.not.equal(200);
    });
  })
});

describe(`USERS`, () => {
  let apiKey;

  describe('POST /register', () => {
    it ('should register user', async () => {
      const res = await request.post(resource + '/register')
                               .send({
                                 email: "test@example.com",
                                 password: "password"
                               })

      expect(res.statusCode).to.equal(200);
      expect(res.body.message).to.be.a('string');
    });

    it ('should fail to register user with existing email', async () => {
      const res = await request.post(resource + '/register')
                               .send({
                                 email: "test@example.com",
                                 password: "password"
                               });

      expect(res.statusCode).to.not.equal(200);
    });
  });

  describe('POST /userLogin', () => {
    it ('should login user', async () => {
      const res = await request.post(resource + '/userLogin')
                               .set({ ContentType: "application/json" })
                               .send({
                                 email: "test@example.com",
                                 password: "password"
                               })

      expect(res.statusCode).to.equal(200);
      expect(res.body.apiKey).to.be.a('string');
      apiKey = res.body.apiKey;
    });

    it ('should fail to login user with incorrect password', async () => {
      const res = await request.post(resource + '/userLogin')
                               .send({
                                 email: "test@example.com",
                                 password: "incorrectPassword"
                               });

      expect(res.statusCode).to.not.equal(200);
    });
  });
});
