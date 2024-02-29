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

    // Find the admin by adminId from the token payload
    const admin = await Admin.findOne({ _id: decoded.adminId });

    // Return error response if admin not found
    if (!admin) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ success: req.i18n.__('SuccessFalse'), message: req.i18n.__('ADMIN_NOT_FOUND') });
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
      return res.status(HTTP_STATUS.FORBIDDEN).json({ success: req.i18n.__('SuccessFalse'), message: req.i18n.__('NOT_AUTHORIZED') });
    }

  } catch (error) {
    // Return error response if token verification fails
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: req.i18n.__('SuccessFalse'), message: req.i18n.__('INVALID_TOKEN') });
  }
};
