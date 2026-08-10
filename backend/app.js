const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const path = require("path");

const {
  notFound,
  errorHandler,
} = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const resortEnquiryRoutes = require("./routes/resortEnquiryRoutes");
const villaEnquiryRoutes = require("./routes/villaEnquiryRoutes");

const app = express();


// --------------------------------------------------
// CORE MIDDLEWARE
// --------------------------------------------------

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


// --------------------------------------------------
// RATE LIMITING
// --------------------------------------------------

const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

app.use("/api/enquiries", enquiryLimiter);
app.use("/api/resorts", enquiryLimiter);
app.use("/api/villas", enquiryLimiter);


// --------------------------------------------------
// HEALTH CHECK
// --------------------------------------------------

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Echo backend is running",
  });
});


// --------------------------------------------------
// API ROUTES
// --------------------------------------------------

app.use("/api/auth", authRoutes);

app.use("/api/enquiries", enquiryRoutes);

app.use("/api/properties", propertyRoutes);

app.use("/api/resorts", resortEnquiryRoutes);

app.use("/api/villas", villaEnquiryRoutes);


// --------------------------------------------------
// SERVE REACT / VITE FRONTEND
// --------------------------------------------------

const frontendPath = path.join(__dirname, "../client/dist");

app.use(express.static(frontendPath));


// --------------------------------------------------
// REACT ROUTER FALLBACK
// --------------------------------------------------

// This is important for routes like:
// /resort
// /villa
// /wedding
// /masterplan
// /contact

app.use((req, res, next) => {
  // Don't handle API routes here
  if (req.path.startsWith("/api/")) {
    return next();
  }

  res.sendFile(path.join(frontendPath, "index.html"));
});


// --------------------------------------------------
// ERROR HANDLING
// --------------------------------------------------

app.use(notFound);

app.use(errorHandler);


// --------------------------------------------------
// EXPORT APP
// --------------------------------------------------

module.exports = app;