const express = require("express");
const router = express.Router();
const {
  createResortEnquiry,
  getResortEnquiries,
} = require("../controllers/resortEnquiryController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Public route to submit resort enquiry
router.post("/", createResortEnquiry);

// Admin route to get all resort enquiries
router.get("/", protect, authorize("admin", "editor"), getResortEnquiries);

module.exports = router;
