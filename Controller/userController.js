const asHandler = require("express-async-handler");
const User = require('../database/userSchema');
const bcrypt = require('bcrypt');

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

  console.log(savedUser);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
    }
  });
});

const loginUser = asHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const dbUser = await User.findOne({ email });
  if (!dbUser) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isPasswordCorrect = await bcrypt.compare(password, dbUser.password);
  if (!isPasswordCorrect) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.status(200).json({
    message: "Login successful",
    user: {
      id: dbUser._id,
      username: dbUser.username,
      email: dbUser.email,
    }
  });
});


const currentUser = asHandler(async (req, res) => {
  res.json({
    message: "Current user information",
  });
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
