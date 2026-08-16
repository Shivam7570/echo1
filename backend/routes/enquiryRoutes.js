const express = require("express");
const router = express.Router();
const {
  getStats,
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} = require("../controllers/enquiryController");

router.get("/stats", getStats);
router.route("/").post(createEnquiry).get(getEnquiries);
router.route("/:id").get(getEnquiryById).put(updateEnquiry).delete(deleteEnquiry);

module.exports = router;

