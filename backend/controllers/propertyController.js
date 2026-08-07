const asyncHandler = require("express-async-handler");
const Property = require("../models/Property");

// @desc    Get all properties (public, supports ?category=villa&featured=true)
// @route   GET /api/properties
// @access  Public
const getProperties = asyncHandler(async (req, res) => {
  const { category, featured, page = 1, limit = 20 } = req.query;

  const filter = { isActive: true };
  if (category) filter.category = category;
  if (featured) filter.isFeatured = featured === "true";

  const skip = (Number(page) - 1) * Number(limit);

  const [properties, total] = await Promise.all([
    Property.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Property.countDocuments(filter),
  ]);

  res.json({
    success: true,
    count: properties.length,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    data: properties,
  });
});

// @desc    Get single property by ID
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property || !property.isActive) {
    res.status(404);
    throw new Error("Property not found");
  }
  res.json({ success: true, data: property });
});

// @desc    Create a new property listing
// @route   POST /api/properties
// @access  Private/Admin
const createProperty = asyncHandler(async (req, res) => {
  const property = await Property.create(req.body);
  res.status(201).json({ success: true, data: property });
});

// @desc    Update a property listing
// @route   PUT /api/properties/:id
// @access  Private/Admin
const updateProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) {
    res.status(404);
    throw new Error("Property not found");
  }

  Object.assign(property, req.body);
  const updated = await property.save();

  res.json({ success: true, data: updated });
});

// @desc    Delete a property listing
// @route   DELETE /api/properties/:id
// @access  Private/Admin
const deleteProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) {
    res.status(404);
    throw new Error("Property not found");
  }

  await property.deleteOne();
  res.json({ success: true, message: "Property deleted" });
});

module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
