const { signJWT, TOKEN_EXPIRES_MS, verifyJWT } = require("../auth/jwt");
const { validateTokenAndGetUser } = require("../auth/validateTokenAndGetUser");
const UserModel = require("../models/users");
const { encryptPassword, comparePasswords } = require("../utils/encrypt");
const httpStatusCodes = require("../utils/httpStatusCodes");
const HTTP = require("../utils/httpStatusCodes");

//check auth when user lands on site we need to check he is logged in
//and update auth context provider or redirect
const checkAuth = async (req, res) => {
  const result = validateTokenAndGetUser(req);

  if (!result.success) {
    return res.status(result.statusCode).json({
      success: false,
      message: result.error,
    });
  }

  //We have the user info lets send back information so AuthContext can use it
  res.status(200).json({
    success: true,
    user: {
      email: result.user.email,
    },
  });
};

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      res
        .status(HTTP.CONFLICT.code)
        .json({ success: false, message: "A user with that email already exists" });
      return;
    }
    //we can register user now
    const user = await UserModel.create({ email, password: encryptPassword(password) });

    // 3. Generate JWT token
    const token = signJWT({
      id: user._id.toString(),
      email: user.email,
    });

    res
      .status(HTTP.CREATED.code)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: TOKEN_EXPIRES_MS,
      })
      .json({
        success: true,
        message: "User registered successfully",
        user: {
          id: user._id.toString(),
          email: user.email,
        },
      });
  } catch (err) {
    res.status(HTTP.SERVER_ERROR.code).json({ success: false, message: "Failed to register user" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("In login ", email);
  //Check if email exists in DB
  const user = await UserModel.findOne({ email });

  if (!user)
    return res.status(HTTP.NOT_FOUND.code).json({ success: false, message: "User not found" });

  const encryptedPassword = user.password;

  //check if password is correct
  if (!comparePasswords(password, encryptedPassword)) {
    return res
      .status(HTTP.UNAUTHORIZED.code)
      .json({ success: false, message: "User credentials are wrong" });
  }
  // 3. Generate JWT token
  const token = signJWT({
    id: user._id.toString(),
    email: user.email,
  });

  res
    .status(HTTP.OK.code)
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: TOKEN_EXPIRES_MS,
    })
    .json({
      success: true,
      message: "Logged in successfully",
      user: {
        id: user._id.toString(),
        email: user.email,
      },
    });
};
const logoutUser = (req, res) => {
  res
    .status(HTTP.OK.code)
    .clearCookie("token", {
      httpOnly: true,
      secure: "lax", // Should be true in production
      sameSite: "strict",
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
};

module.exports = { registerUser, loginUser, logoutUser, checkAuth };
