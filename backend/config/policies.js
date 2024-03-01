/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  ParentController: {
    '*': 'adminAuth' // Apply 'adminAuth' policy to all actions of ParentController
  },
  StudentController:{
    '*': [ 'adminAuth' ,'studentAuth']
  }
};
