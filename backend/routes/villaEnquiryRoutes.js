const express = require("express");
const router = express.Router();
const {
  createVillaEnquiry,
  getVillaEnquiries,
} = require("../controllers/villaEnquiryController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Public route to submit villa enquiry
router.post("/", createVillaEnquiry);

// Admin route to get all villa enquiries
router.get("/", protect, authorize("admin", "editor"), getVillaEnquiries);

module.exports = router;
