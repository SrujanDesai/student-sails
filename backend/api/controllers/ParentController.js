/**
 * ParentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { HTTP_STATUS } = require('../../config/constant');

module.exports = {
  // Create a new parent record
  createParent: async function (req, res) {
    try {
      // Create a new parent record and fetch the created record
      const parent = await Parent.create(req.body).fetch();
      // Return success response with created parent data
      res.status(HTTP_STATUS.SUCCESS).json({
        success: req.i18n.__('SuccessTrue'),
        message: 'Parent created successfully',
        data: parent,
      });
    } catch (error) {
      // Return error response if creation fails
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ success: req.i18n.__('SuccessFalse'), message: error.message });
    }
  },

  // Retrieve all parent records
  getAllParents: async function (req, res) {
    const page = req.query.page || 1; // Get the page number from the request query parameters, default to 1 if not provided
    const perPage = req.query.perPage || 10; // Get the number of items per page from the request query parameters, default to 10 if not provided
    const skip = (page - 1) * perPage; // Calculate the number of items to skip based on the page number and items per page
    const limit = perPage; // Set the limit to the number of items per page
    try {
      // Find all parent records with pagination
      const parents = await Parent.find().limit(limit).skip(skip);

      // Return success response with parent data
      res.status(HTTP_STATUS.SUCCESS).json({ success: req.i18n.__('SuccessTrue'), data: parents });
    } catch (error) {
      // Return error response if retrieval fails
      res
        .status(HTTP_STATUS.SERVER_ERROR)
        .json({ success: req.i18n.__('SuccessFalse'), message: error.message });
    }
  },


  // Retrieve a specific parent record by ID
  getParentById: async function (req, res) {
    try {
      // Find parent by ID
      const parent = await Parent.findOne({ id: req.params.id });
      // Return error response if parent not found
      if (!parent) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: req.i18n.__('SuccessFalse'),
          message: req.i18n.__('PARENT_NOT_FOUND'),
        });
      }
      // Return success response with parent data
      res.json({ success: req.i18n.__('SuccessTrue'), data: parent });
    } catch (error) {
      // Return error response if retrieval fails
      res
        .status(HTTP_STATUS.SERVER_ERROR)
        .json({ success: req.i18n.__('SuccessFalse'), message: error.message });
    }
  },

  // Update a parent record by ID
  updateParentById: async function (req, res) {
    try {
      // Extract parent ID from request parameters
      const parentId = req.params.id;
      const parent = await Parent.findOne({ id: parentId });

      // Return error response if parent not found
      if (!parent) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ success: req.i18n.__('SuccessFalse'), message: req.i18n.__('PARENT_NOT_FOUND') });
      }

      // Update parent record with provided data
      const updatedParent = await Parent.updateOne({ id: parentId }).set(
        req.body
      );

      // Return success response with updated parent data
      res.json({
        success: req.i18n.__('SuccessTrue'),
        message: 'Parent updated successfully',
        data: updatedParent,
      });
    } catch (error) {
      // Return error response if update fails
      res
        .status(HTTP_STATUS.SERVER_ERROR)
        .json({ success: req.i18n.__('SuccessFalse'), message: error.message });
    }
  },

  // Delete a parent record by ID
  deleteParentById: async function (req, res) {
    try {
      // Extract parent ID from request parameters
      const parentId = req.params.id;
      const parent = await Parent.findOne({ id: parentId });

      // Return error response if parent not found
      if (!parent) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ success: req.i18n.__('SuccessFalse'), message: req.i18n.__('PARENT_NOT_FOUND') });
      }

      // Delete parent record by ID
      const deletedParent = await Parent.destroyOne({ id: parentId });

      // Return success response if deletion is successful
      res.json({
        success: req.i18n.__('SuccessTrue'),
        message: 'Parent deleted successfully',
        data: deletedParent,
      });
    } catch (error) {
      // Return error response if deletion fails
      res
        .status(HTTP_STATUS.SERVER_ERROR)
        .json({ success: req.i18n.__('SuccessFalse'), message: error.message });
    }
  },
};
