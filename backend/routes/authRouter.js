const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authRouter = express.Router();

// Signup auth API
authRouter.post("/api/user/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existName = await User.findOne({ username });
    const existMail = await User.findOne({ email });
    if (existName || existMail)
      return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    let user = new User({
      username,
      email,
      password : hashedPassword,
    });

    user = await user.save().then(() => {
      res.json({ ...user._doc, msg: "User created successfully" });
    }).catch((e) => {
      res.status(500).json({ err: e.message });
    });
    
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

// Signin auth API
authRouter.post("/api/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "secretKey");
    res.json({ token, ...user._doc });

  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

module.exports = authRouter;
