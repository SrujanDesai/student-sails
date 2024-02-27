/**
 * Parent.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  name: {
    type: 'string',
    required: true,
  },
  email: {
    type: 'string',
    required: true,
    unique: true,
    isEmail: true,
  },
  student: {
    type: 'string',
    required: true,
  },
  relation: {
    type: 'string',
    required: true,
    enum: ['Father', 'Mother', 'Guardian'],
  },
};
