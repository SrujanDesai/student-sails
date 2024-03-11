const { expect } = require('chai');

describe('Student Model', () => {

  describe('Attributes', () => {
    it('should have the correct attributes', () => {
      expect(Student.attributes).to.haveOwnProperty('name');
      expect(Student.attributes).to.haveOwnProperty('email');
      expect(Student.attributes).to.haveOwnProperty('password');
      expect(Student.attributes).to.haveOwnProperty('std');
      expect(Student.attributes).to.haveOwnProperty('school');
    });

    it('should have correct attribute types', () => {
      expect(Student.attributes.name.type).to.equal('string');
      expect(Student.attributes.email.type).to.equal('string');
      expect(Student.attributes.password.type).to.equal('string');
      expect(Student.attributes.std.type).to.equal('string');
      expect(Student.attributes.school.type).to.equal('string');
    });

    it('should have correct attribute validations', () => {
      expect(Student.attributes.name.required).to.be.true;
      expect(Student.attributes.email.required).to.be.true;
      expect(Student.attributes.email.autoMigrations.unique).to.be.true;
      expect(Student.attributes.email.validations.isEmail).to.be.true;
      expect(Student.attributes.password.required).to.be.true;
      expect(Student.attributes.password.validations.minLength).to.equal(6);
      expect(Student.attributes.std.required).to.be.true;
      expect(Student.attributes.school.required).to.be.true;
    });
  });

});
