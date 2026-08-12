const asyncHandler = require("express-async-handler");
const VillaEnquiry = require("../models/VillaEnquiry");
const Enquiry = require("../models/Enquiry");

// @desc    Create a new villa enquiry
// @route   POST /api/villas
// @access  Public
const createVillaEnquiry = asyncHandler(async (req, res) => {
  const { name, email, phone, city, villaName, budgetRange, purpose, message } = req.body;

  if (!name || (!email && !phone)) {
    res.status(400);
    throw new Error("Name and at least one of email or phone are required");
  }

  // 1. Save into villas collection
  const enquiry = await VillaEnquiry.create({
    name,
    email,
    phone,
    city,
    villaName,
    budgetRange,
    purpose,
    message,
  });

  // 2. Save copy into master Enquiry collection
  await Enquiry.create({
    name,
    email,
    phone,
    city,
    villaName,
    budgetRange,
    purpose,
    message,
    source: "villa",
  }).catch((err) => console.error("Master Enquiry mirror failed:", err));

  res.status(201).json({
    success: true,
    message: "Villa Enquiry submitted successfully.",
    data: enquiry,
  });
});

// @desc    Get all villa enquiries
// @route   GET /api/villas
// @access  Public/Admin
const getVillaEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await VillaEnquiry.find().sort({ createdAt: -1 });
  res.json({ success: true, count: enquiries.length, data: enquiries });
});

// @desc    Update villa enquiry
// @route   PUT /api/villas/:id
// @access  Public/Admin
const updateVillaEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await VillaEnquiry.findById(req.params.id);
  if (!enquiry) {
    res.status(404);
    throw new Error("Villa enquiry not found");
  }

  const fields = ["name", "email", "phone", "city", "villaName", "budgetRange", "purpose", "message", "status"];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      enquiry[field] = req.body[field];
    }
  });

  const updated = await enquiry.save();
  res.json({ success: true, data: updated });
});

// @desc    Delete villa enquiry
// @route   DELETE /api/villas/:id
// @access  Public/Admin
const deleteVillaEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await VillaEnquiry.findById(req.params.id);
  if (!enquiry) {
    res.status(404);
    throw new Error("Villa enquiry not found");
  }

  await enquiry.deleteOne();
  res.json({ success: true, message: "Villa enquiry deleted" });
});

module.exports = {
  createVillaEnquiry,
  getVillaEnquiries,
  updateVillaEnquiry,
  deleteVillaEnquiry,
};
