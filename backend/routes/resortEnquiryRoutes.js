const express = require("express");
const router = express.Router();
const {
  createResortEnquiry,
  getResortEnquiries,
  updateResortEnquiry,
  deleteResortEnquiry,
} = require("../controllers/resortEnquiryController");

router.route("/").post(createResortEnquiry).get(getResortEnquiries);
router.route("/:id").put(updateResortEnquiry).delete(deleteResortEnquiry);

module.exports = router;
