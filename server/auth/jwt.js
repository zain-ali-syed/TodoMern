const jwt = require("jsonwebtoken");

const TOKEN_EXPIRES_MS = 60 * 60 * 1000; //1hour

function signJWT(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: TOKEN_EXPIRES_MS,
  });
}

const verifyJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { signJWT, verifyJWT, TOKEN_EXPIRES_MS };
