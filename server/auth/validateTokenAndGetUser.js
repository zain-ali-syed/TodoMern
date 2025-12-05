const { verifyJWT } = require("../auth/jwt");
const httpStatusCodes = require("../utils/httpStatusCodes");

/**
 * Validate token from request cookies
 * @param {Object} req - Express request object
 * @returns {Object} Validation result
 */
const validateTokenAndGetUser = (req) => {
  const token = req.cookies.token;

  if (!token) {
    return {
      success: false,
      error: "No token provided",
      statusCode: httpStatusCodes.UNAUTHORIZED.code,
    };
  }

  try {
    const decoded = verifyJWT(token);
    return {
      success: true,
      user: decoded,
    };
  } catch (err) {
    return {
      success: false,
      error: "Invalid or expired token",
      statusCode: httpStatusCodes.UNAUTHORIZED.code,
    };
  }
};

module.exports = { validateTokenAndGetUser };
