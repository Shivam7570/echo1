const asyncHandler = require("express-async-handler");
const VillaEnquiry = require("../models/VillaEnquiry");

// @desc    Create a new villa enquiry
// @route   POST /api/villas
// @access  Public
const createVillaEnquiry = asyncHandler(async (req, res) => {
  const { name, email, phone, city, villaName, budgetRange, purpose, message } = req.body;

  if (!name || (!email && !phone)) {
    res.status(400);
    throw new Error("Name and at least one of email or phone are required");
  }

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

  res.status(201).json({
    success: true,
    message: "Villa Enquiry submitted successfully.",
    data: enquiry,
  });
});

// @desc    Get all villa enquiries
// @route   GET /api/villas
// @access  Private/Admin
const getVillaEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await VillaEnquiry.find().sort({ createdAt: -1 });
  res.json({ success: true, count: enquiries.length, data: enquiries });
});

module.exports = {
  createVillaEnquiry,
  getVillaEnquiries,
};
