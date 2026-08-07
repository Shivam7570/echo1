const jwt = require("jsonwebtoken");

// Generates a JWT and sets it as an httpOnly cookie on the response
const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

  const cookieExpireDays = Number(process.env.JWT_COOKIE_EXPIRES_DAYS) || 7;

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: cookieExpireDays * 24 * 60 * 60 * 1000,
  });

  return token;
};

module.exports = generateToken;
