const supertest = require('supertest');
const TestingCallbacks = require('../helpers/TestingCallbacks');
const { getText } = require('./AdminController.test.js');

let studentText; // To store the authentication token for testing purposes

describe('Testing Student Controller', () => {
  // Create a student
  it('Create Student', (done) => {
    const text = getText();

    supertest(sails.hooks.http.app)
      .post('/student/add')
      .set('Authorization', `Bearer ${text.token}`)
      .send({
        name: 'Test Student',
        email: 'teststudent@example.com',
        password: 'testpassword',
        std: '12',
        school: 'Test School',
      })
      .end((err, res) => {
        TestingCallbacks.fn(err, res, done);
      });
  });

  // Login a student and get the authentication token
  it('Student Login', (done) => {
    supertest(sails.hooks.http.app)
      .post('/student/login')
      .send({
        email: 'jenish@gmail.com',
        password: 'jenish123',
      })
      .end(async (err, res) => {
        studentText = await TestingCallbacks.parseText(res.text);
        TestingCallbacks.fn(err, res, done);
      });
  });

  // Retrieve all students (requires authentication)
  it('Get All Students', (done) => {
    const text = getText();

    supertest(sails.hooks.http.app)
      .get('/student')
      .set('Authorization', `Bearer ${text.token}`)
      .end((err, res) => TestingCallbacks.fn(err, res, done));
  });

  // Retrieve a specific student by ID (requires authentication)
  it('Get Student by ID', (done) => {
    const text = getText();

    supertest(sails.hooks.http.app)
      .get(`/student/65e166af40d2ca7c99ed67ba`) // Replace :id with the ID of the student you want to retrieve
      .set('Authorization', `Bearer ${text.token}`)
      .end((err, res) => TestingCallbacks.fn(err, res, done));
  });

  // Update a student record by ID (requires authentication)
  it('Update Student by ID', (done) => {
    const text = getText();

    supertest(sails.hooks.http.app)
      .put(`/student/edit/65e1644d74f45ad9958c9042`) // Replace :id with the ID of the student you want to update
      .set('Authorization', `Bearer ${text.token}`)
      .send({
        name: 'Updated Name',
        email: 'updatedemail@example.com',
        std: '11',
        school: 'Updated School',
      })
      .end((err, res) => TestingCallbacks.fn(err, res, done));
  });

  // Delete a student record by ID (requires authentication)
  it('Delete Student by ID', (done) => {
    const text = getText();

    supertest(sails.hooks.http.app)
      .delete(`/student/delete/65e1645974f45ad9958c9043`) // Replace :id with the ID of the student you want to delete
      .set('Authorization', `Bearer ${text.token}`)
      .end((err, res) => TestingCallbacks.fn(err, res, done));
  });

  // Retrieve a specific student by ID after student login
  it('Get Student by ID after Login', (done) => {
    supertest(sails.hooks.http.app)
      .get(`/student/login/65e1643874f45ad9958c9041`)
      .set('Authorization', `Bearer ${studentText.token}`) // Set the Authorization header with the token
      .end((err, res) => TestingCallbacks.fn(err, res, done));
  });

  // Update a student record by ID after student login
  it('Update Student by ID after Login', (done) => {
    supertest(sails.hooks.http.app)
      .put(`/student/login/edit/65e1643874f45ad9958c9041`) // Replace :id with the ID of the student you want to update
      .set('Authorization', `Bearer ${studentText.token}`) // Set the Authorization header with the token
      .send({
        name: 'Updated Name',
        email: 'updatedemail@example.com',
        std: '11',
        school: 'Updated School',
      })
      .end((err, res) => TestingCallbacks.fn(err, res, done));
  });
});
