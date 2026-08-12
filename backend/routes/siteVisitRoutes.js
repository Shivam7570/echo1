const express = require("express");
const router = express.Router();
const {
  createSiteVisit,
  getSiteVisits,
  updateSiteVisit,
  deleteSiteVisit,
} = require("../controllers/siteVisitController");

router.route("/").post(createSiteVisit).get(getSiteVisits);
router.route("/:id").put(updateSiteVisit).delete(deleteSiteVisit);

module.exports = router;
