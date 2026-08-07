const express = require("express");
const router = express.Router();
const {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} = require("../controllers/enquiryController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Public - anyone submitting the contact/enquiry form or chat widget
router.post("/", createEnquiry);

// Admin only
router.get("/", protect, authorize("admin", "editor"), getEnquiries);
router.get("/:id", protect, authorize("admin", "editor"), getEnquiryById);
router.put("/:id", protect, authorize("admin", "editor"), updateEnquiry);
router.delete("/:id", protect, authorize("admin"), deleteEnquiry);

module.exports = router;
