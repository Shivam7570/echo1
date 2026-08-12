const asyncHandler = require("express-async-handler");
const SiteVisit = require("../models/SiteVisit");
const Enquiry = require("../models/Enquiry");

// @desc    Create a new site visit request
// @route   POST /api/site-visits
// @access  Public
const createSiteVisit = asyncHandler(async (req, res) => {
  const { name, email, phone, city, propertyType, message, source } = req.body;

  if (!name || (!email && !phone)) {
    res.status(400);
    throw new Error("Name and at least one of email or phone are required");
  }

  // 1. Save in sitevisits database collection
  const siteVisit = await SiteVisit.create({
    name,
    email,
    phone,
    city,
    propertyType: propertyType || "General Site Visit",
    message,
    source: source || "site-visit",
  });

  // 2. Save copy in master Enquiry database collection
  await Enquiry.create({
    name,
    email,
    phone,
    city,
    villaName: propertyType,
    message: message || `Site Visit Requested for ${propertyType || "Resort & Villa"}`,
    source: source || "site-visit",
  }).catch((err) => console.error("Master Enquiry mirror log failed:", err));

  res.status(201).json({
    success: true,
    message: "Site Visit request submitted successfully.",
    data: siteVisit,
  });
});

// @desc    Get all site visit requests
// @route   GET /api/site-visits
// @access  Public/Admin
const getSiteVisits = asyncHandler(async (req, res) => {
  const siteVisits = await SiteVisit.find().sort({ createdAt: -1 });
  res.json({ success: true, count: siteVisits.length, data: siteVisits });
});

// @desc    Update site visit request by ID
// @route   PUT /api/site-visits/:id
// @access  Public/Admin
const updateSiteVisit = asyncHandler(async (req, res) => {
  const siteVisit = await SiteVisit.findById(req.params.id);
  if (!siteVisit) {
    res.status(404);
    throw new Error("Site visit record not found");
  }

  const fields = ["name", "email", "phone", "city", "propertyType", "message", "status"];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      siteVisit[field] = req.body[field];
    }
  });

  const updated = await siteVisit.save();
  res.json({ success: true, data: updated });
});

// @desc    Delete site visit request by ID
// @route   DELETE /api/site-visits/:id
// @access  Public/Admin
const deleteSiteVisit = asyncHandler(async (req, res) => {
  const siteVisit = await SiteVisit.findById(req.params.id);
  if (!siteVisit) {
    res.status(404);
    throw new Error("Site visit record not found");
  }

  await siteVisit.deleteOne();
  res.json({ success: true, message: "Site visit record deleted" });
});

module.exports = {
  createSiteVisit,
  getSiteVisits,
  updateSiteVisit,
  deleteSiteVisit,
};
