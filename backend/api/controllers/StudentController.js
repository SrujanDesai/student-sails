/**
 * StudentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { messages, success } = require('../../config/locales/constant');

module.exports = {
  // Create a new student record
  createStudent: async function (req, res) {
    // Extract data from request body
    const { name, email, password, std, school } = req.body;

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new student with hashed password
      const newStudent = await Student.create({
        name,
        email,
        password: hashedPassword,
        std,
        school,
      }).fetch();

      // Return success response with created student data
      res.status(201).json({
        success: success.SuccessTrue,
        message: 'Student created successfully',
        data: newStudent,
      });
    } catch (error) {
      // Return error response if creation fails
      console.error('Error creating student:', error);
      res.status(500).json({ success: success.SuccessFalse, error: 'Internal Server Error' });
    }
  },

  // Retrieve all student records
  getAllStudents: async function (req, res) {
    try {
      // Find all students
      const students = await Student.find();
      // Return success response with student data
      res.status(200).json({ success: success.SuccessTrue, data: students });
    } catch (error) {
      // Return error response if retrieval fails
      res.status(500).json({ success: success.SuccessFalse, message: error.message });
    }
  },

  // Retrieve a specific student record by ID
  getStudentById: async function (req, res) {
    try {
      // Find student by ID
      const student = await Student.findOne({ id: req.params.id });

      // Return error response if student not found
      if (!student) {
        return res.status(404).json({ success: success.SuccessFalse, message: messages.STUDENT_NOT_FOUND });
      }
      // Return success response with student data
      res.json({ success: success.SuccessTrue, data: student });
    } catch (error) {
      // Return error response if retrieval fails
      res.status(500).json({ success: success.SuccessFalse, message: error.message });
    }
  },

  // Update a student record by ID
  updateStudentById: async function (req, res) {
    try {
      const { name, email, password, std, school } = req.body;
      // Extract student ID from request parameters
      const studentId = req.params.id;
      const student = await Student.findOne({ id: studentId });

      // Return error response if student not found
      if (!student) {
        return res.status(404).json({ success: success.SuccessFalse, message: messages.STUDENT_NOT_FOUND });
      }

      // Update student record with provided data
      const updatedStudent = await Student.updateOne({ id: studentId }).set({ name, email, password, std, school });

      // Return success response with updated student data
      res.status(200).json({
        success: success.SuccessTrue,
        message: 'Student updated successfully',
        data: updatedStudent,
      });
    } catch (error) {
      // Return error response if update fails
      res.status(500).json({ success: success.SuccessFalse, message: error.message });
    }
  },

  // Delete a student record by ID
  deleteStudentById: async function (req, res) {
    try {

      // Extract student ID from request parameters
      const studentId = req.params.id;
      const student = await Student.findOne({ id: studentId });

      // Return error response if student not found
      if (!student) {
        return res.status(404).json({ success: success.SuccessFalse, message: messages.STUDENT_NOT_FOUND });
      }

      // Delete student record by ID
      const deletedStudent = await Student.destroyOne({ id: studentId });

      // Return success response if deletion is successful
      res.status(200).json({
        success: success.SuccessTrue,
        message: 'Student deleted successfully',
        data: deletedStudent,
      });
    } catch (error) {
      // Return error response if deletion fails
      res.status(500).json({ message: error.message });
    }
  },

  // Student login
  studentLogin: async function (req, res) {
    try {
      // Extract email and password from request body
      const { email, password } = req.body;
      // Find student by email
      const student = await Student.findOne({ email });

      // Return error response if student not found
      if (!student) {
        return res.status(404).json({ success: success.SuccessFalse, message: messages.STUDENT_NOT_FOUND });
      }

      // Validate password
      const isMatch = await bcrypt.compare(password, student.password);
      // Return error response if password is invalid
      if (!isMatch) {
        return res.status(401).json({ success: success.SuccessFalse, message: messages.PASSWORD_VALIDATE });
      }

      // Generate JWT token
      const token = jwt.sign(
        { studentId: student.id, role: student.role },
        process.env.JWT_SECRET
      );

      // Return success response with JWT token
      res.status(200).json({ success: success.SuccessTrue, token, message: messages.STUDENT_LOGIN });
    } catch (error) {
      // Return error response if login fails
      res.status(500).json({ success: success.SuccessFalse, message: error.message });
    }
  },
};
