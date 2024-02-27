/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {messages, success} = require('../../config/locales/constant');

module.exports = {
  // Admin signup
  signup: async function (req, res) {
    try {
      // Extract data from request body
      const { name, email, password } = req.body;

      // Check if admin with the same email exists
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({
          success: success.SuccessFalse,
          message: messages.ALREADY_EXISTS,
        });
      }

      // Define salt rounds for password hashing
      const saltRound = 10;

      // Hash the password and create a new admin
      const hashedPassword = await bcrypt.hash(password, saltRound);
      const newAdmin = await Admin.create({ name, email, password: hashedPassword }).fetch();

      // Return success response with created admin data
      res.status(201).json({
        success: success.SuccessTrue,
        message: messages.ADMIN_REGISTER,
        newAdmin,
      });
    } catch (error) {
      // Return error response if signup fails
      res.status(500).json({ success: success.SuccessFalse, message: error.message });
    }
  },

  // Admin login
  login: async function (req, res) {
    const { email, password } = req.body;

    try {
      // Find admin by email
      const admin = await Admin.findOne({ email });
      // Return error response if admin not found
      if (!admin) {
        return res.status(404).json({ success: success.SuccessFalse, message: messages.ADMIN_NOT_FOUND });
      }

      // Validate password
      const isMatch = await bcrypt.compare(password, admin.password);
      // Return error response if password is invalid
      if (!isMatch) {
        return res.status(401).json({ success: success.SuccessFalse, message: messages.PASSWORD_VALIDATE });
      }

      // Generate JWT token
      const token = jwt.sign(
            { adminId: admin.id, role: admin.role },
            process.env.JWT_SECRET
      );

      // Return success response with JWT token
      res.status(200).json({
        token,
        success: success.SuccessTrue,
        message: messages.ADMIN_LOGIN,
      });
    } catch (error) {
      // Return error response if login fails
      res.status(500).json({ success: success.SuccessFalse, message: error.message });
    }
  },
};
