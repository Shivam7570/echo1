const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

// Ensure default admin exists
const ensureDefaultAdmin = async (email, password) => {
  if (email.toLowerCase() === "srajpoot8932@gmail.com") {
    let user = await User.findOne({ email: "srajpoot8932@gmail.com" });
    if (!user) {
      user = await User.create({
        name: "Admin",
        email: "srajpoot8932@gmail.com",
        password: password || "echo75@admin",
        role: "admin",
      });
      console.log("Default admin srajpoot8932@gmail.com created successfully.");
    }
    return user;
  }
  return null;
};

// @desc    Register a new admin user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please provide name, email and password");
  }

  const userExists = await User.findOne({ email: email.toLowerCase() });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email: email.toLowerCase(), password });

  generateToken(res, user._id);

  res.status(201).json({
    success: true,
    data: { _id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

// @desc    Login user & set token cookie
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter both email and password");
  }

  const cleanEmail = email.toLowerCase().trim();

  // Auto-create default admin if missing
  await ensureDefaultAdmin(cleanEmail, password);

  let user = await User.findOne({ email: cleanEmail }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  generateToken(res, user._id);

  res.json({
    success: true,
    data: { _id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

// @desc    Send Email with Confirmation Button to Gmail
// @route   POST /api/auth/request-email-confirmation
// @access  Public
const requestEmailConfirmationLink = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Please enter your registered Gmail address");
  }

  const cleanEmail = email.toLowerCase().trim();

  let user = await User.findOne({ email: cleanEmail });
  if (!user && cleanEmail === "srajpoot8932@gmail.com") {
    user = await ensureDefaultAdmin(cleanEmail, "echo75@admin");
  }

  if (!user) {
    res.status(404);
    throw new Error("No registered admin user found with this email address");
  }

  // Generate crypto token
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  user.resetToken = hashedToken;
  user.resetTokenExpire = new Date(Date.now() + 15 * 60 * 1000); // 15 mins
  await user.save();

  const origin = req.headers.origin || req.headers.referer || "http://localhost:5173";
  const baseUrl = origin.replace(/\/$/, "");
  const confirmationLink = `${baseUrl}/?resetToken=${resetToken}&email=${encodeURIComponent(cleanEmail)}`;

  console.log(`\n==================================================`);
  console.log(`🔗 GMAIL CONFIRMATION LINK FOR ${cleanEmail}:`);
  console.log(confirmationLink);
  console.log(`==================================================\n`);

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #07120c; color: #ffffff; border-radius: 16px; border: 1px solid #C6A15B;">
      <div style="text-align: center; margin-bottom: 20px;">
        <span style="background-color: rgba(198,161,91,0.2); border: 1px solid #C6A15B; color: #C6A15B; padding: 4px 12px; border-radius: 20px; font-size: 11px; text-transform: uppercase; font-weight: bold;">
          Echo Admin Security
        </span>
        <h2 style="color: #C6A15B; font-family: Georgia, serif; margin-top: 10px; font-size: 22px;">
          PASSWORD CHANGE CONFIRMATION
        </h2>
      </div>

      <p style="color: #e0e0e0; font-size: 14px; line-height: 1.6;">Hello Admin,</p>
      <p style="color: #e0e0e0; font-size: 14px; line-height: 1.6;">
        We received a request to reset your password for your Echo Admin account (<strong>${cleanEmail}</strong>).
      </p>
      <p style="color: #e0e0e0; font-size: 14px; line-height: 1.6;">
        Please click the confirmation button below to verify your Gmail identity and proceed to set a new password:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${confirmationLink}" target="_blank" style="background-color: #C6A15B; color: #07120c; font-weight: bold; font-size: 15px; padding: 14px 28px; text-decoration: none; border-radius: 10px; display: inline-block; box-shadow: 0 4px 15px rgba(198,161,91,0.3); text-transform: uppercase; letter-spacing: 1px;">
          ✓ CONFIRM PASSWORD RESET NOW
        </a>
      </div>

      <p style="color: #888888; font-size: 12px; line-height: 1.5; border-top: 1px solid #1a2e22; padding-top: 15px; margin-top: 20px;">
        * Note: This confirmation link will expire in <strong>15 minutes</strong>. If you did not request this email, you can safely ignore it—your password will remain unchanged.
      </p>
    </div>
  `;

  await sendEmail({
    to: cleanEmail,
    subject: `🔒 Action Required: Confirm Password Reset for ${cleanEmail}`,
    html: htmlContent,
    text: `Click this link to confirm password reset: ${confirmationLink}`,
  });

  res.json({
    success: true,
    message: `Confirmation email sent to ${cleanEmail}! Check your Gmail and click the confirmation button inside.`,
    confirmationLink,
  });
});

// @desc    Verify Confirmation Token from Email Link
// @route   POST /api/auth/verify-reset-token
// @access  Public
const verifyEmailConfirmationToken = asyncHandler(async (req, res) => {
  const { email, token } = req.body;

  if (!email || !token) {
    res.status(400);
    throw new Error("Missing confirmation parameters");
  }

  const cleanEmail = email.toLowerCase().trim();
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    email: cleanEmail,
    resetToken: hashedToken,
    resetTokenExpire: { $gt: Date.now() },
  }).select("+resetToken +resetTokenExpire");

  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired confirmation link. You must click the confirmation button sent to your Gmail.");
  }

  res.json({
    success: true,
    message: "Gmail confirmation verified! You may now set your new password.",
  });
});

// @desc    Submit New Password after Email Confirmation
// @route   POST /api/auth/confirm-new-password
// @access  Public
const confirmNewPassword = asyncHandler(async (req, res) => {
  const { email, token, newPassword } = req.body;

  if (!email || !token || !newPassword) {
    res.status(400);
    throw new Error("Missing required confirmation parameters or new password");
  }

  if (newPassword.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters long");
  }

  const cleanEmail = email.toLowerCase().trim();
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    email: cleanEmail,
    resetToken: hashedToken,
    resetTokenExpire: { $gt: Date.now() },
  }).select("+resetToken +resetTokenExpire");

  if (!user) {
    res.status(400);
    throw new Error("Confirmation verification failed or expired. Please click the button in your Gmail again.");
  }

  user.password = newPassword;
  user.resetToken = undefined;
  user.resetTokenExpire = undefined;
  await user.save();

  res.json({
    success: true,
    message: "Password changed successfully! You can now log in with your new password.",
  });
});

// @desc    Step 1: Request Password Change Confirmation Code via Email
// @route   POST /api/auth/request-reset-code
// @access  Public
const requestResetCode = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Please enter your registered Gmail address");
  }

  const cleanEmail = email.toLowerCase().trim();

  // Ensure default admin user exists if requesting for srajpoot8932@gmail.com
  let user = await User.findOne({ email: cleanEmail });
  if (!user && cleanEmail === "srajpoot8932@gmail.com") {
    user = await ensureDefaultAdmin(cleanEmail, "echo75@admin");
  }

  if (!user) {
    res.status(404);
    throw new Error("No registered admin user found with this email address");
  }

  // Generate 6-digit confirmation code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expireTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

  user.resetCode = code;
  user.resetCodeExpire = expireTime;
  await user.save();

  // Console notice banner for instant dev testing
  console.log(`\n==================================================`);
  console.log(`🔑 PASSWORD CONFIRMATION CODE FOR ${cleanEmail}: ${code}`);
  console.log(`==================================================\n`);

  // Send HTML Email to user's Gmail
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #07120c; color: #ffffff; border-radius: 10px;">
      <h2 style="color: #C6A15B; font-family: Georgia, serif;">ECHO ADMIN - PASSWORD CHANGE REQUEST</h2>
      <p style="color: #dddddd; font-size: 14px;">Hello Admin,</p>
      <p style="color: #dddddd; font-size: 14px;">You have requested to change your password for the Echo Admin Portal.</p>
      <p style="color: #dddddd; font-size: 14px;">Your 6-digit email confirmation code is:</p>
      <div style="background-color: #12281d; border: 1px solid #C6A15B; color: #C6A15B; font-size: 28px; font-weight: bold; letter-spacing: 6px; padding: 15px 25px; display: inline-block; border-radius: 8px; margin: 15px 0;">
        ${code}
      </div>
      <p style="color: #aaaaaa; font-size: 12px; margin-top: 15px;">This confirmation code will expire in <strong>10 minutes</strong>.</p>
      <p style="color: #888888; font-size: 11px;">If you did not request a password change, please ignore this email.</p>
    </div>
  `;

  await sendEmail({
    to: cleanEmail,
    subject: `Echo Admin - Your 6-Digit Password Confirmation Code: ${code}`,
    html: htmlContent,
    text: `Your password change confirmation code is: ${code}. Valid for 10 minutes.`,
  });

  res.json({
    success: true,
    message: `Confirmation code sent to ${cleanEmail}! Please check your inbox.`,
    devCode: code,
  });
});

// @desc    Step 2: Verify Confirmation Code & Update Password
// @route   POST /api/auth/verify-reset-password
// @access  Public
const verifyResetCode = asyncHandler(async (req, res) => {
  const { email, code, newPassword } = req.body;

  if (!email || !code || !newPassword) {
    res.status(400);
    throw new Error("Please provide your email, 6-digit confirmation code, and new password");
  }

  if (newPassword.length < 6) {
    res.status(400);
    throw new Error("New password must be at least 6 characters long");
  }

  const cleanEmail = email.toLowerCase().trim();
  const cleanCode = code.toString().trim();

  const user = await User.findOne({ email: cleanEmail }).select("+resetCode +resetCodeExpire");

  if (!user) {
    res.status(404);
    throw new Error("No admin account found with this email address");
  }

  // Verify code & expiry
  const isValidCode = user.resetCode && user.resetCode === cleanCode;
  const isNotExpired = user.resetCodeExpire && new Date(user.resetCodeExpire) > new Date();

  // Allow fallback verification if code matches
  if (!isValidCode || !isNotExpired) {
    res.status(400);
    throw new Error("Invalid or expired confirmation code. Please request a new confirmation code.");
  }

  // Update password
  user.password = newPassword;
  user.resetCode = undefined;
  user.resetCodeExpire = undefined;
  await user.save();

  res.json({
    success: true,
    message: "Confirmation code verified! Your password has been changed successfully. You can now log in.",
  });
});

// @desc    Direct Forgot / Reset Password Fallback
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    res.status(400);
    throw new Error("Please provide your email and a new password");
  }

  if (newPassword.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters long");
  }

  const cleanEmail = email.toLowerCase().trim();
  let user = await User.findOne({ email: cleanEmail });

  if (!user && cleanEmail === "srajpoot8932@gmail.com") {
    user = await User.create({
      name: "Admin",
      email: cleanEmail,
      password: newPassword,
      role: "admin",
    });
  } else if (!user) {
    res.status(404);
    throw new Error("No admin account found with this email address");
  } else {
    user.password = newPassword;
    await user.save();
  }

  res.json({
    success: true,
    message: "Password changed successfully! You can now log in with your new password.",
  });
});

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.json({ success: true, message: "Logged out successfully" });
});

// @desc    Get current logged-in user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, data: req.user });
});

module.exports = {
  registerUser,
  loginUser,
  requestEmailConfirmationLink,
  verifyEmailConfirmationToken,
  confirmNewPassword,
  requestResetCode,
  verifyResetCode,
  forgotPassword,
  logoutUser,
  getMe,
};



