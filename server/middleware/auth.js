const { validateTokenAndGetUser } = require("../auth/validateTokenAndGetUser");

function requireAuth(req, res, next) {
  const result = validateTokenAndGetUser(req);
  if (!result.success) {
    return res.status(result.statusCode).json({
      success: false,
      message: result.error,
    });
  }
  //We have a valid user
  req.user = result.user;
  next();
}

module.exports = { requireAuth };
