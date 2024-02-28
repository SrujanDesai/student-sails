/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  // Routes for AdminController
  'POST /admin/signup': 'AdminController.signup', // Route for admin signup
  'POST /admin/login': 'AdminController.login', // Route for admin login

  // Routes for ParentController
  'POST /parent/add': 'ParentController.createParent', // Route to add a new parent
  'GET /parent': 'ParentController.getAllParents', // Route to get all parents
  'GET /parent/:id': 'ParentController.getParentById', // Route to get parent by ID
  'PUT /parent/edit/:id': 'ParentController.updateParentById', // Route to edit parent by ID
  'DELETE /parent/delete/:id': 'ParentController.deleteParentById', // Route to delete parent by ID

  // Routes for StudentController with 'adminAuth' policy
  'POST /student/add': { action: 'Student/createStudent', policy: 'adminAuth' }, // Route to add a new student with admin authentication
  'GET /student': { action: 'Student/getAllStudents', policy: 'adminAuth' }, // Route to get all students with admin authentication
  'GET /student/:id': { action: 'Student/getStudentById', policy: 'adminAuth' }, // Route to get student by ID with admin authentication
  'PUT /student/edit/:id': { action: 'Student/updateStudentById', policy: 'adminAuth' }, // Route to edit student by ID with admin authentication
  'DELETE /student/delete/:id': { action: 'Student/deleteStudentById', policy: 'adminAuth' }, // Route to delete student by ID with admin authentication

  // Routes for StudentController with 'studentAuth' policy
  'POST /student/login': 'StudentController.studentLogin', // Route for student login
  'GET /student/login/:id': { action: 'Student/getStudentById', policy: 'studentAuth' }, // Route to get student by ID with student authentication
  'PUT /student/login/edit/:id': { action: 'Student/updateStudentById', policy: 'studentAuth' }, // Route to edit student by ID with student authentication

};
