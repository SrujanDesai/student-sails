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

  'POST /admin/signup': 'AdminController.signup',
  'POST /admin/login': 'AdminController.login',

  'POST /parent/add': 'ParentController.createParent',
  'GET /parent': 'ParentController.getAllParents',
  'GET /parent/:id': 'ParentController.getParentById',
  'PUT /parent/edit/:id': 'ParentController.updateParentById',
  'DELETE /parent/delete/:id': 'ParentController.deleteParentById',

  'POST /student/add': { action: 'Student/createStudent', policy: 'adminAuth' },
  'GET /student': { action: 'Student/getAllStudents', policy: 'adminAuth' },
  'GET /student/:id': { action: 'Student/getStudentById', policy: 'adminAuth' },
  'PUT /student/edit/:id': { action: 'Student/updateStudentById', policy: 'adminAuth' },
  'DELETE /student/delete/:id': { action: 'Student/deleteStudentById', policy: 'adminAuth' },

  'POST /student/login': 'StudentController.studentLogin',
  'GET /student/login/:id': { action: 'Student/getStudentById', policy: 'studentAuth' },
  'PUT /student/login/edit/:id': { action: 'Student/updateStudentById', policy: 'studentAuth' },

};
