/**
 * StudentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { HTTP_STATUS, bcrypt, jwt } = require('../../config/constant');

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
      res.status(HTTP_STATUS.SUCCESS).json({
        success: req.i18n.__('SuccessTrue'),
        message: 'Student created successfully',
        data: newStudent,
      });
    } catch (error) {
      // Return error response if creation fails
      console.error('Error creating student:', error);
      res.status(HTTP_STATUS.SERVER_ERROR).json({ success: req.i18n.__('SuccessFalse'), error: 'Internal Server Error' });
    }
  },

  // Retrieve all student records
  getAllStudents: async function (req, res) {
    const page = req.query.page || 1; // Get the page number from the request query parameters, default to 1 if not provided
    const perPage = req.query.perPage || 10; // Get the number of items per page from the request query parameters, default to 10 if not provided
    const skip = (page - 1) * perPage; // Calculate the number of items to skip based on the page number and items per page
    const limit = perPage; // Set the limit to the number of items per page
    try {
      // Find all students with pagination
      const students = await Student.find().limit(limit).skip(skip);
      // Return success response with student data
      res.status(HTTP_STATUS.SUCCESS).json({ success: req.i18n.__('SuccessTrue'), data: students });
    } catch (error) {
      // Return error response if retrieval fails
      res.status(HTTP_STATUS.SERVER_ERROR).json({ success: req.i18n.__('SuccessFalse'), message: error.message });
    }
  },

  // Retrieve a specific student record by ID
  getStudentById: async function (req, res) {
    try {
      // Find student by ID
      const student = await Student.findOne({ id: req.params.id });

      // Return error response if student not found
      if (!student) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ success: req.i18n.__('SuccessFalse'), message: req.i18n.__('STUDENT_NOT_FOUND') });
      }
      // Return success response with student data
      res.json({ success: req.i18n.__('SuccessTrue'), data: student });
    } catch (error) {
      // Return error response if retrieval fails
      res.status(HTTP_STATUS.SERVER_ERROR).json({ success: req.i18n.__('SuccessFalse'), message: error.message });
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
        return res.status(HTTP_STATUS.NOT_FOUND).json({ success: req.i18n.__('SuccessFalse'), message: req.i18n.__('STUDENT_NOT_FOUND') });
      }

      // Update student record with provided data
      const updatedStudent = await Student.updateOne({ id: studentId }).set({ name, email, password, std, school });

      // Return success response with updated student data
      res.status(HTTP_STATUS.SUCCESS).json({
        success: req.i18n.__('SuccessTrue'),
        message: 'Student updated successfully',
        data: updatedStudent,
      });
    } catch (error) {
      // Return error response if update fails
      res.status(HTTP_STATUS.SERVER_ERROR).json({ success: req.i18n.__('SuccessFalse'), message: error.message });
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
        return res.status(HTTP_STATUS.NOT_FOUND).json({ success: req.i18n.__('SuccessFalse'), message: req.i18n.__('STUDENT_NOT_FOUND') });
      }

      // Delete student record by ID
      const deletedStudent = await Student.destroyOne({ id: studentId });

      // Return success response if deletion is successful
      res.status(HTTP_STATUS.SUCCESS).json({
        success: req.i18n.__('SuccessTrue'),
        message: 'Student deleted successfully',
        data: deletedStudent,
      });
    } catch (error) {
      // Return error response if deletion fails
      res.status(HTTP_STATUS.SERVER_ERROR).json({ message: error.message });
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
        return res.status(HTTP_STATUS.NOT_FOUND).json({ success: req.i18n.__('SuccessFalse'), message: req.i18n.__('STUDENT_NOT_FOUND') });
      }

      // Validate password
      const isMatch = await bcrypt.compare(password, student.password);
      // Return error response if password is invalid
      if (!isMatch) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: req.i18n.__('SuccessFalse'), message: req.i18n.__('PASSWORD_VALIDATE') });
      }

      // Generate JWT token
      const token = jwt.sign(
        { studentId: student.id, role: student.role },
        process.env.JWT_SECRET
      );

      // Return success response with JWT token
      res.status(HTTP_STATUS.SUCCESS).json({ success: req.i18n.__('SuccessTrue'), token, message: req.i18n.__('STUDENT_LOGIN') });
    } catch (error) {
      // Return error response if login fails
      res.status(HTTP_STATUS.SERVER_ERROR).json({ success: req.i18n.__('SuccessFalse'), message: error.message });
    }
  },

  getStudent: async function (req, res) {
    try {
      // Find student by ID
      const student = await Student.findOne({ id: req.params.id });

      // Return error response if student not found
      if (!student) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ success: req.i18n.__('SuccessFalse'), message: req.i18n.__('STUDENT_NOT_FOUND') });
      }
      // Return success response with student data
      res.json({ success: req.i18n.__('SuccessTrue'), data: student });
    } catch (error) {
      // Return error response if retrieval fails
      res.status(HTTP_STATUS.SERVER_ERROR).json({ success: req.i18n.__('SuccessFalse'), message: error.message });
    }
  },

  updateStudent: async function (req, res) {
    try {
      const { name, email, password, std, school } = req.body;
      // Extract student ID from request parameters
      const studentId = req.params.id;
      const student = await Student.findOne({ id: studentId });

      // Return error response if student not found
      if (!student) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ success: req.i18n.__('SuccessFalse'), message: req.i18n.__('STUDENT_NOT_FOUND') });
      }

      // Update student record with provided data
      const updatedStudent = await Student.updateOne({ id: studentId }).set({ name, email, password, std, school });

      // Return success response with updated student data
      res.status(HTTP_STATUS.SUCCESS).json({
        success: req.i18n.__('SuccessTrue'),
        message: 'Student updated successfully',
        data: updatedStudent,
      });
    } catch (error) {
      // Return error response if update fails
      res.status(HTTP_STATUS.SERVER_ERROR).json({ success: req.i18n.__('SuccessFalse'), message: error.message });
    }
  },
};
