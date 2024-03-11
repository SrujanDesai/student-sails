const { expect } = require('chai');

describe('Admin Model', () => {

  describe('Attributes', () => {
    it('should have the correct attributes', () => {
      expect(Admin.attributes).to.haveOwnProperty('name');
      expect(Admin.attributes).to.haveOwnProperty('email');
      expect(Admin.attributes).to.haveOwnProperty('password');
    });

    it('should have correct attribute types', () => {
      expect(Admin.attributes.name.type).to.equal('string');
      expect(Admin.attributes.email.type).to.equal('string');
      expect(Admin.attributes.password.type).to.equal('string');
    });

    it('should have correct attribute validations', () => {
      expect(Admin.attributes.name.required).to.be.true;
      expect(Admin.attributes.email.required).to.be.true;
      expect(Admin.attributes.email.autoMigrations.unique).to.be.true;
      expect(Admin.attributes.email.validations.isEmail).to.be.true;
      expect(Admin.attributes.password.required).to.be.true;
      expect(Admin.attributes.password.validations.minLength).to.equal(6);
    });
  });
});
