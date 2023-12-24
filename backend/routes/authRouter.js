const express = require("express");
const loginUser = require("../controllers/authController");
const signupUser = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post('/api/user/signup', (req, res) => signupUser);

authRouter.post("/api/user/login", (req, res) => loginUser);

module.exports = authRouter;
