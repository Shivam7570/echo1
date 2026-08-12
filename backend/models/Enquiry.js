const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
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
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [20, "Phone number cannot exceed 20 characters"],
    },
    message: {
      type: String,
      trim: true,
      maxlength: [2000, "Message cannot exceed 2000 characters"],
    },
    city: {
      type: String,
      trim: true,
    },
    visitDate: {
      type: String,
      trim: true,
    },
    visitTime: {
      type: String,
      trim: true,
    },
    resortName: {
      type: String,
      trim: true,
    },
    villaName: {
      type: String,
      trim: true,
    },
    budgetRange: {
      type: String,
      trim: true,
    },
    purpose: {
      type: String,
      trim: true,
    },
    source: {
      // which part of the site the enquiry came from
      type: String,
      enum: [
        "contact-page",
        "chat-widget",
        "home",
        "resort",
        "villa",
        "wedding",
        "wedding-contact",
        "masterplan",
        "site-visit",
        "site-visit-modal",
        "other",
      ],
      default: "other",
    },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enquiry", enquirySchema);
