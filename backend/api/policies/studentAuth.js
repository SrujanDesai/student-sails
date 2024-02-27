const jwt = require('jsonwebtoken');
const { messages, success } = require('../../config/locales/constant');

module.exports = async function(req, res, proceed) {
  try {
    // Get the token from the request header
    const token = req.headers.authorization.split(' ')[1];

    // Check if token exists
    if (!token) {
      return res.status(401).json({ success: success.SuccessFalse, message: messages.ACCESS_DENIED });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the student by studentId from the token payload
    const student = await Student.findOne({ id: decoded.studentId });

    // Return error response if student not found
    if (!student) {
      return res.status(404).json({ success: success.SuccessFalse, message: messages.STUDENT_NOT_FOUND });
    }

    // Extract student ID from request parameters
    const requestedStudentId = req.params.id;

    // Compare requested student ID with ID from token
    if (decoded.studentId !== requestedStudentId ) {
      return res.status(403).json({ success: success.SuccessFalse, message: messages.NOT_AUTHORIZED });
    }

    // Proceed to the next middleware or route handler
    return proceed();
  } catch (error) {
    // Return error response if token verification fails
    return res.status(401).json({ success: success.SuccessFalse, message: messages.INVALID_TOKEN });
  }
};
