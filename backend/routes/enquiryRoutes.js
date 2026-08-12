const express = require("express");
const router = express.Router();
const {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} = require("../controllers/enquiryController");

router.route("/").post(createEnquiry).get(getEnquiries);
router.route("/:id").get(getEnquiryById).put(updateEnquiry).delete(deleteEnquiry);

module.exports = router;
