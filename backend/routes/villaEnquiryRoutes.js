const express = require("express");
const router = express.Router();
const {
  createVillaEnquiry,
  getVillaEnquiries,
  updateVillaEnquiry,
  deleteVillaEnquiry,
} = require("../controllers/villaEnquiryController");

router.route("/").post(createVillaEnquiry).get(getVillaEnquiries);
router.route("/:id").put(updateVillaEnquiry).delete(deleteVillaEnquiry);

module.exports = router;
