const supertest = require('supertest');
const TestingCallbacks = require('../helpers/TestingCallbacks');
const { getText } = require('./AdminController.test.js');

describe('Testing Parent Controller', () => {
  // Create a parent
  it('Create Parent', (done) => {
    const text = getText();

    supertest(sails.hooks.http.app)
      .post('/parent/add')
      .set('Authorization', `Bearer ${text.token}`)
      .send({
        name: 'Test Parent',
        email: 'testparent@example.com',
        student: 'testStudent',
        relation: 'Father',
      })
      .end((err, res) => {
        TestingCallbacks.fn(err, res, done);
      });
  });

  // Retrieve all parents (requires authentication)
  it('Get All Parents', (done) => {
    const text = getText();

    supertest(sails.hooks.http.app)
      .get('/parent')
      .set('Authorization', `Bearer ${text.token}`)
      .end((err, res) => TestingCallbacks.fn(err, res, done));
  });

  // Retrieve a specific parent by ID (requires authentication)
  it('Get Parent by ID', (done) => {
    const text = getText();

    supertest(sails.hooks.http.app)
      .get(`/parent/65e1665140d2ca7c99ed67b7`) // Replace :id with the ID of the student you want to retrieve
      .set('Authorization', `Bearer ${text.token}`)
      .end((err, res) => TestingCallbacks.fn(err, res, done));
  });

  // Update a parent record by ID (requires authentication)
  it('Update Parent by ID', (done) => {
    const text = getText();

    supertest(sails.hooks.http.app)
      .put(`/parent/edit/65e166cc40d2ca7c99ed67bb`) // Replace :id with the ID of the student you want to update
      .set('Authorization', `Bearer ${text.token}`)
      .send({
        name: 'Updated Name',
        email: 'updatedemail@example.com',
        std: '11',
        school: 'Updated School',
      })
      .end((err, res) => TestingCallbacks.fn(err, res, done));
  });

  // Delete a parent record by ID (requires authentication)
  it('Delete Parent by ID', (done) => {
    const text = getText();

    supertest(sails.hooks.http.app)
      .delete(`/parent/delete/65e1667140d2ca7c99ed67b9`) // Replace :id with the ID of the student you want to delete
      .set('Authorization', `Bearer ${text.token}`)
      .end((err, res) => TestingCallbacks.fn(err, res, done));
  });
});
