const { HTTP_STATUS } = require('../../../config/constant');

module.exports = {


  fn: (err, res, done) => {
    if (err) {
      return done(err);
    } else {
      if (res.statusCode !== HTTP_STATUS.SUCCESS) {
        return done(new Error(res.text));
      } else {
        console.log(res.text);
        return done();
      }
    }
  },

  parseText: (text) => {
    try {
      return JSON.parse(text);
    } catch (error) {
      console.error('Error parsing response:', error.message);
      return null;
    }
  }

};
