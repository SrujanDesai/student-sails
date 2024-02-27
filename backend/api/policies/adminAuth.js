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

    // Find the admin by adminId from the token payload
    const admin = await Admin.findOne({ _id: decoded.adminId });

    // Return error response if admin not found
    if (!admin) {
      return res.status(404).json({ success: success.SuccessFalse, message: messages.ADMIN_NOT_FOUND });
    }

    // Attach the admin object and role to the request object for further use
    req.admin = {
      id: admin.id,
      role: admin.role,
    };

    // Check if the admin ID matches the decoded admin ID
    const adminId = req.admin.id;
    if (adminId === decoded.adminId) {
      // Proceed to the next middleware or route handler
      return proceed();
    } else {
      // Return error response if admin ID does not match
      return res.status(403).json({ success: success.SuccessFalse, message: messages.NOT_AUTHORIZED });
    }

  } catch (error) {
    // Return error response if token verification fails
    return res.status(401).json({ success: success.SuccessFalse, message: messages.INVALID_TOKEN });
  }
};
