const mongoose = require("mongoose");

const resortEnquirySchema = new mongoose.Schema(
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
    city: {
      type: String,
      trim: true,
    },
    resortName: {
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
    message: {
      type: String,
      trim: true,
      maxlength: [2000, "Message cannot exceed 2000 characters"],
    },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
  },
  { timestamps: true, collection: "resorts" }
);

module.exports = mongoose.model("ResortEnquiry", resortEnquirySchema);
