/**
 * ParentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { messages, success } = require('../../config/locales/constant');

module.exports = {
  // Create a new parent record
  createParent: async function (req, res) {
    try {
      // Create a new parent record and fetch the created record
      const parent = await Parent.create(req.body).fetch();
      // Return success response with created parent data
      res.status(201).json({
        success: success.SuccessTrue,
        message: 'Parent created successfully',
        data: parent,
      });
    } catch (error) {
      // Return error response if creation fails
      res
        .status(400)
        .json({ success: success.SuccessFalse, message: error.message });
    }
  },

  // Retrieve all parent records
  getAllParents: async function (req, res) {
    try {
      // Find all parent records
      const parents = await Parent.find();

      // Return success response with parent data
      res.json({ success: success.SuccessTrue, data: parents });
    } catch (error) {
      // Return error response if retrieval fails
      res
        .status(500)
        .json({ success: success.SuccessFalse, message: error.message });
    }
  },

  // Retrieve a specific parent record by ID
  getParentById: async function (req, res) {
    try {
      // Find parent by ID
      const parent = await Parent.findOne({ id: req.params.id });
      // Return error response if parent not found
      if (!parent) {
        return res.status(404).json({
          success: success.SuccessFalse,
          message: messages.PARENT_NOT_FOUND,
        });
      }
      // Return success response with parent data
      res.json({ success: success.SuccessTrue, data: parent });
    } catch (error) {
      // Return error response if retrieval fails
      res
        .status(500)
        .json({ success: success.SuccessFalse, message: error.message });
    }
  },

  // Update a parent record by ID
  updateParentById: async function (req, res) {
    try {
      // Update parent record with provided data
      const updatedParent = await Parent.updateOne({ id: req.params.id }).set(
        req.body
      );
      // Return error response if parent not found
      if (!updatedParent) {
        return res.status(404).json({
          success: success.SuccessFalse,
          message: messages.PARENT_NOT_FOUND,
        });
      }
      // Return success response with updated parent data
      res.json({
        success: success.SuccessTrue,
        message: 'Parent updated successfully',
        data: updatedParent,
      });
    } catch (error) {
      // Return error response if update fails
      res
        .status(500)
        .json({ success: success.SuccessFalse, message: error.message });
    }
  },

  // Delete a parent record by ID
  deleteParentById: async function (req, res) {
    try {
      // Delete parent record by ID
      const deletedParent = await Parent.destroyOne({ id: req.params.id });
      // Return error response if parent not found
      if (!deletedParent) {
        return res.status(404).json({
          success: success.SuccessFalse,
          message: messages.PARENT_NOT_FOUND,
        });
      }
      // Return success response if deletion is successful
      res.json({
        success: success.SuccessTrue,
        message: 'Parent deleted successfully',
        data: deletedParent,
      });
    } catch (error) {
      // Return error response if deletion fails
      res
        .status(500)
        .json({ success: success.SuccessFalse, message: error.message });
    }
  },
};
