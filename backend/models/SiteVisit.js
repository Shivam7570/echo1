const mongoose = require("mongoose");

const siteVisitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      required: [true, "Phone number is required"],
      maxlength: [20, "Phone number cannot exceed 20 characters"],
    },
    city: {
      type: String,
      trim: true,
    },
    propertyType: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: [2000, "Message cannot exceed 2000 characters"],
    },
    source: {
      type: String,
      default: "site-visit",
    },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
  },
  { timestamps: true, collection: "sitevisits" }
);

module.exports = mongoose.model("SiteVisit", siteVisitSchema);
