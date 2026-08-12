const asyncHandler = require("express-async-handler");
const Enquiry = require("../models/Enquiry");

// @desc    Create a new enquiry
// @route   POST /api/enquiries
// @access  Public
const createEnquiry = asyncHandler(async (req, res) => {
  const { name, email, phone, message, source, city, resortName, villaName, budgetRange, purpose } = req.body;

  if (!name || (!email && !phone)) {
    res.status(400);
    throw new Error("Name and at least one of email or phone are required");
  }

  const enquiry = await Enquiry.create({
    name,
    email,
    phone,
    message,
    source: source || "other",
    city,
    resortName,
    villaName,
    budgetRange,
    purpose,
  });

  res.status(201).json({
    success: true,
    message: "Enquiry submitted successfully.",
    data: enquiry,
  });
});

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Public/Admin
const getEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await Enquiry.find().sort({ createdAt: -1 });
  res.json({
    success: true,
    count: enquiries.length,
    data: enquiries,
  });
});

// @desc    Get a single enquiry by ID
// @route   GET /api/enquiries/:id
// @access  Public/Admin
const getEnquiryById = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);
  if (!enquiry) {
    res.status(404);
    throw new Error("Enquiry not found");
  }
  res.json({ success: true, data: enquiry });
});

// @desc    Update enquiry by ID
// @route   PUT /api/enquiries/:id
// @access  Public/Admin
const updateEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);
  if (!enquiry) {
    res.status(404);
    throw new Error("Enquiry not found");
  }

  const fields = ["name", "email", "phone", "city", "resortName", "villaName", "budgetRange", "purpose", "message", "status", "source"];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      enquiry[field] = req.body[field];
    }
  });

  const updated = await enquiry.save();
  res.json({ success: true, data: updated });
});

// @desc    Delete an enquiry
// @route   DELETE /api/enquiries/:id
// @access  Public/Admin
const deleteEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);
  if (!enquiry) {
    res.status(404);
    throw new Error("Enquiry not found");
  }

  await enquiry.deleteOne();
  res.json({ success: true, message: "Enquiry deleted" });
});

module.exports = {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
};
