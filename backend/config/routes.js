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

  // Routes for StudentController
  'POST /student/add': 'StudentController.createStudent', // Route to add a new student
  'GET /student': 'StudentController.getAllStudents', // Route to get all students
  'GET /student/:id': 'StudentController.getStudentById', // Route to get student by ID
  'PUT /student/edit/:id': 'StudentController.updateStudentById', // Route to edit student by ID
  'DELETE /student/delete/:id': 'StudentController.deleteStudentById', // Route to delete student by ID

  'POST /student/login': 'StudentController.studentLogin', // Route for student login
  'GET /student/login/:id': 'StudentController.getStudent', // Route to get student by ID after student login
  'PUT /student/login/edit/:id': 'StudentController.updateStudent' // Route to edit student by ID after student login
};
