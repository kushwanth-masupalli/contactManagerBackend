const asHandler = require("express-async-handler");
const User = require("../database/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()


// register
const registerUser = asHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const availableUser = await User.findOne({ email });
  if (availableUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const savedUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });


  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
    },
  });
});

const loginUser = asHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const accessToken = jwt.sign(
    {
      user: {
        username: user.username,
        email: user.email,
        id: user._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "14m" }
  );

  res.status(200).json({ accessToken });
});

const currentUser = asHandler(async (req, res) => {
  res.json( req.user
);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
