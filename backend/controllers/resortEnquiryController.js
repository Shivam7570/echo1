const asyncHandler = require("express-async-handler");
const ResortEnquiry = require("../models/ResortEnquiry");
const Enquiry = require("../models/Enquiry");

// @desc    Create a new resort enquiry
// @route   POST /api/resorts
// @access  Public
const createResortEnquiry = asyncHandler(async (req, res) => {
  const { name, email, phone, city, resortName, budgetRange, purpose, message } = req.body;

  if (!name || (!email && !phone)) {
    res.status(400);
    throw new Error("Name and at least one of email or phone are required");
  }

  // 1. Save into resorts collection
  const enquiry = await ResortEnquiry.create({
    name,
    email,
    phone,
    city,
    resortName,
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
    resortName,
    budgetRange,
    purpose,
    message,
    source: "resort",
  }).catch((err) => console.error("Master Enquiry mirror failed:", err));

  res.status(201).json({
    success: true,
    message: "Resort Enquiry submitted successfully.",
    data: enquiry,
  });
});

// @desc    Get all resort enquiries
// @route   GET /api/resorts
// @access  Public/Admin
const getResortEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await ResortEnquiry.find().sort({ createdAt: -1 });
  res.json({ success: true, count: enquiries.length, data: enquiries });
});

// @desc    Update resort enquiry
// @route   PUT /api/resorts/:id
// @access  Public/Admin
const updateResortEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await ResortEnquiry.findById(req.params.id);
  if (!enquiry) {
    res.status(404);
    throw new Error("Resort enquiry not found");
  }

  const fields = ["name", "email", "phone", "city", "resortName", "budgetRange", "purpose", "message", "status"];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      enquiry[field] = req.body[field];
    }
  });

  const updated = await enquiry.save();
  res.json({ success: true, data: updated });
});

// @desc    Delete resort enquiry
// @route   DELETE /api/resorts/:id
// @access  Public/Admin
const deleteResortEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await ResortEnquiry.findById(req.params.id);
  if (!enquiry) {
    res.status(404);
    throw new Error("Resort enquiry not found");
  }

  await enquiry.deleteOne();
  res.json({ success: true, message: "Resort enquiry deleted" });
});

module.exports = {
  createResortEnquiry,
  getResortEnquiries,
  updateResortEnquiry,
  deleteResortEnquiry,
};
