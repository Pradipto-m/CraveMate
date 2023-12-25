const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Bearer");
    if (!token)
      return res.status(401).json({ err: "Unauthorized" });

    const verified = jwt.verify(token, "authKey");
    if (!verified)
      return res
        .status(401)
        .json({ err: "Unauthorized" });

    req.user = verified.id;
    req.token = token;

    next();
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
};

module.exports = auth;