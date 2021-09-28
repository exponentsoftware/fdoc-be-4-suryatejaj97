const jwt = require("jsonwebtoken");

exports.requireSigninAdmin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const admin = jwt.verify(token, process.env.SECRET_KEY_ADMIN);
    req.user = admin;
  } else {
    return res.status(400).json({ message: "Authorization required" });
  }
  next();
};

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET_KEY);
    req.user = user;
  } else {
    return res.status(400).json({ message: "Authorization required" });
  }
  next();
};
