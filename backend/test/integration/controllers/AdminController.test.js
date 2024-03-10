const supertest = require('supertest');
const TestingCallbacks = require('../helpers/TestingCallbacks');
var text;

describe('Testing Admin Controller', () => {
  it('Admin Sign Up', (done) => {
    supertest(sails.hooks.http.app)
      .post('/admin/signup')
      .send({
        name: 'tester',
        email: 'tester@gmail.com',
        password: 'tester123'
      })
      .end((err, res) => TestingCallbacks.fn(err, res, done));

  });

  it('Admin Login', (done) => {
    supertest(sails.hooks.http.app)
      .post('/admin/login')
      .send({
        email: 'tester@gmail.com',
        password: 'tester123'
      })
      .end(async (err, res) => {
        text = await TestingCallbacks.parseText(res.text);
        TestingCallbacks.fn(err, res, done);
      });
  });
});