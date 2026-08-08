const asyncHandler = require("express-async-handler");
const Enquiry = require("../models/Enquiry");

// @desc    Create a new enquiry (public - contact form / enquiry form / chat widget)
// @route   POST /api/enquiries
// @access  Public
const createEnquiry = asyncHandler(async (req, res) => {
  const { name, email, phone, message, source, city, visitDate, visitTime, resortName, villaName, budgetRange, purpose } = req.body;

  if (!name || (!email && !phone)) {
    res.status(400);
    throw new Error("Name and at least one of email or phone are required");
  }

  const enquiry = await Enquiry.create({
    name,
    email,
    phone,
    message,
    source,
    city,
    visitDate,
    visitTime,
    resortName,
    villaName,
    budgetRange,
    purpose,
  });

  res.status(201).json({
    success: true,
    message: "Enquiry submitted successfully. Our team will get back to you soon.",
    data: enquiry,
  });
});

// @desc    Get all enquiries (admin, supports filtering & pagination)
// @route   GET /api/enquiries
// @access  Private/Admin
const getEnquiries = asyncHandler(async (req, res) => {
  const { status, source, page = 1, limit = 20 } = req.query;

  const filter = {};
  if (status) filter.status = status;
  if (source) filter.source = source;

  const skip = (Number(page) - 1) * Number(limit);

  const [enquiries, total] = await Promise.all([
    Enquiry.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Enquiry.countDocuments(filter),
  ]);

  res.json({
    success: true,
    count: enquiries.length,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    data: enquiries,
  });
});

// @desc    Get a single enquiry by ID
// @route   GET /api/enquiries/:id
// @access  Private/Admin
const getEnquiryById = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);
  if (!enquiry) {
    res.status(404);
    throw new Error("Enquiry not found");
  }
  res.json({ success: true, data: enquiry });
});

// @desc    Update enquiry status (new / contacted / closed)
// @route   PUT /api/enquiries/:id
// @access  Private/Admin
const updateEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);
  if (!enquiry) {
    res.status(404);
    throw new Error("Enquiry not found");
  }

  enquiry.status = req.body.status || enquiry.status;
  const updated = await enquiry.save();

  res.json({ success: true, data: updated });
});

// @desc    Delete an enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private/Admin
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
