const asyncHandler = require("express-async-handler");
const ResortEnquiry = require("../models/ResortEnquiry");

// @desc    Create a new resort enquiry
// @route   POST /api/resorts
// @access  Public
const createResortEnquiry = asyncHandler(async (req, res) => {
  const { name, email, phone, city, resortName, budgetRange, purpose, message } = req.body;

  if (!name || (!email && !phone)) {
    res.status(400);
    throw new Error("Name and at least one of email or phone are required");
  }

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

  res.status(201).json({
    success: true,
    message: "Resort Enquiry submitted successfully.",
    data: enquiry,
  });
});

// @desc    Get all resort enquiries
// @route   GET /api/resorts
// @access  Private/Admin
const getResortEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await ResortEnquiry.find().sort({ createdAt: -1 });
  res.json({ success: true, count: enquiries.length, data: enquiries });
});

module.exports = {
  createResortEnquiry,
  getResortEnquiries,
};
