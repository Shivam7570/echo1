const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/request-email-confirmation", requestEmailConfirmationLink);
router.post("/verify-reset-token", verifyEmailConfirmationToken);
router.post("/confirm-new-password", confirmNewPassword);
router.post("/request-reset-code", requestResetCode);
router.post("/forgot-password-request", requestResetCode);
router.post("/send-confirmation-code", requestResetCode);
router.post("/verify-reset-password", verifyResetCode);
router.post("/reset-password", verifyResetCode);
router.post("/forgot-password", forgotPassword);
router.post("/logout", protect, logoutUser);
router.get("/me", protect, getMe);

module.exports = router;




