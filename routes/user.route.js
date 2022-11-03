const { UserModel } = require("../models/user.model");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY || "qwerty";

const { Router } = require("express");
const userController = Router();

userController.post("/signup", async (req, res) => {
  let { email, password, name } = req.body;
  bcrypt
    .hash(password, 5)
    .then(async (hash) => {
      const user = new UserModel({ email, password: hash, name });
      await user.save();
      res.send("User created successfully");
    })
    .catch((err) => console.log("error", err));
});

userController.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await UserModel.findOne({ email });
  let hash = user.password;

  bcrypt.compare(password, hash, (err, result) => {
    if (result) {
      let token = jwt.sign({ userId: user._id }, SECRET_KEY);
      res.send({
        msg: "Successfully signed",
        token: token,
      });
    } else res.send({ msg: "Failed" });
  });
});

module.exports = { userController };
