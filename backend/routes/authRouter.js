const express = require("express");
const { signupUser, loginUser, getUser } = require("../controllers/authController");
const auth = require("../middleware/auth");

const authRouter = express.Router();

authRouter.post('/api/user/signup', signupUser);

authRouter.post("/api/user/login", loginUser);

authRouter.get("/api/user/auth", auth, getUser);

module.exports = authRouter;