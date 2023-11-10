const express = require("express");
const User = require("../models/userModel");

const authRouter = express.Router();

authRouter.post("/api/user/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existName = await User.findOne({ username });
    const existMail = await User.findOne({ email });
    if (existName || existMail)
      return res.status(400).json({ msg: "User already exists" });

    let user = new User({
      username,
      email,
      password,
    });

    user = await user.save().then(() => {
      res.json(user);
    }).catch((e) => {
      res.status(400).json({ msg: e.message });
    });
    
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

module.exports = authRouter;
