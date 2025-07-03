const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validate = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || req.headers.Authorization;

  if (!header || !header.startsWith("Bearer ")) {
    res.status(401);
    throw new Error("No token provided");
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // sync
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403);
    throw new Error("Token problem: " + err.message);
  }
});


module.exports = validate;