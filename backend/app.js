const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const resortEnquiryRoutes = require("./routes/resortEnquiryRoutes");
const villaEnquiryRoutes = require("./routes/villaEnquiryRoutes");

const app = express();

// ---- Core middleware ----
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Basic rate limiting for public form submissions (anti-spam)
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { success: false, message: "Too many requests, please try again later." },
});
app.use("/api/enquiries", enquiryLimiter);
app.use("/api/resorts", enquiryLimiter);
app.use("/api/villas", enquiryLimiter);

// ---- Health check ----
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Echo backend is running" });
});

// ---- API routes ----
app.use("/api/auth", authRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/resorts", resortEnquiryRoutes);
app.use("/api/villas", villaEnquiryRoutes);

// ---- Error handling ----
app.use(notFound);
app.use(errorHandler);

module.exports = app;
