const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    category: {
      // which section of the site this listing belongs to
      type: String,
      enum: ["villa", "resort", "plot", "masterplan"],
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      min: 0,
    },
    sizeSqft: {
      type: Number,
      min: 0,
    },
    bedrooms: {
      type: Number,
      min: 0,
    },
    bathrooms: {
      type: Number,
      min: 0,
    },
    amenities: [{ type: String, trim: true }],
    images: [{ type: String, trim: true }], // image URLs
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

propertySchema.index({ category: 1, isActive: 1 });

module.exports = mongoose.model("Property", propertySchema);
