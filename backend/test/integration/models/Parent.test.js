const { expect } = require('chai');
const Parent = require('../../../api/models/Parent');

describe('Parent Model', () => {

  describe('Attributes', () => {
    it('should have the correct attributes', () => {
      expect(Parent.attributes).to.haveOwnProperty('name');
      expect(Parent.attributes).to.haveOwnProperty('email');
      expect(Parent.attributes).to.haveOwnProperty('student');
      expect(Parent.attributes).to.haveOwnProperty('relation');
    });

    it('should have correct attribute types', () => {
      expect(Parent.attributes.name.type).to.equal('string');
      expect(Parent.attributes.email.type).to.equal('string');
      expect(Parent.attributes.student.model).to.equal('student');
      expect(Parent.attributes.relation.type).to.equal('string');
    });

    it('should have correct attribute validations', () => {
      expect(Parent.attributes.name.required).to.be.true;
      expect(Parent.attributes.email.required).to.be.true;
      expect(Parent.attributes.email.unique).to.be.true;
      expect(Parent.attributes.email.isEmail).to.be.true;
      expect(Parent.attributes.student.required).to.be.true;
      expect(Parent.attributes.relation.required).to.be.true;
      expect(Parent.attributes.relation.enum).to.deep.equal(['Father', 'Mother', 'Guardian']);
    });
  });

});
