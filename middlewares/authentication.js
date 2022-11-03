const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY || "qwerty";

const authentication = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.send("Please login");
  }

  const token = req.headers?.authorization?.split(" ")[1];
  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) res.send("Please check your credentials");
    else {
      req.body.userId = decoded.userId;
      next();
    }
  });
};
module.exports = { authentication };
