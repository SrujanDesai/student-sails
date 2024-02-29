const { HTTP_STATUS, jwt } = require('../../config/constant');

module.exports = async function(req, res, proceed) {
  try {
    // Get the token from the request header
    const token = req.headers.authorization.split(' ')[1];

    // Check if token exists
    if (!token) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: req.i18n.__('SuccessFalse'), message: req.i18n.__('ACCESS_DENIED') });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the student by studentId from the token payload
    const student = await Student.findOne({ id: decoded.studentId });

    // Return error response if student not found
    if (!student) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ success: req.i18n.__('SuccessFalse'), message: req.i18n.__('STUDENT_NOT_FOUND') });
    }

    // Extract student ID from request parameters
    const requestedStudentId = req.params.id;

    // Compare requested student ID with ID from token
    if (decoded.studentId !== requestedStudentId ) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({ success: req.i18n.__('SuccessFalse'), message: req.i18n.__('NOT_AUTHORIZED') });
    }

    // Proceed to the next middleware or route handler
    return proceed();
  } catch (error) {
    // Return error response if token verification fails
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: req.i18n.__('SuccessFalse'), message: req.i18n.__('INVALID_TOKEN') });
  }
};
