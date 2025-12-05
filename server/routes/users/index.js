const express = require("express");
const router = express.Router();

const { registerUser, loginUser, logoutUser, checkAuth } = require("../../controllers/users");

//User routes
//Check Auth
// (for when user lands on site we want to check if user is logged in and if so update AuthContext)
router.get("/check", checkAuth);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
