const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const {
  notFound,
  errorHandler,
} = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const resortEnquiryRoutes = require("./routes/resortEnquiryRoutes");
const villaEnquiryRoutes = require("./routes/villaEnquiryRoutes");
const siteVisitRoutes = require("./routes/siteVisitRoutes");

const app = express();


// --------------------------------------------------
// CORE MIDDLEWARE
// --------------------------------------------------

// Enable CORS for frontend and admin panel
app.use(cors({
  origin: true,
  credentials: true
}));

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
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

// Rate limiting on both /api and root paths
app.use("/api/enquiries", enquiryLimiter);
app.use("/enquiries", enquiryLimiter);
app.use("/api/resorts", enquiryLimiter);
app.use("/resorts", enquiryLimiter);
app.use("/api/villas", enquiryLimiter);
app.use("/villas", enquiryLimiter);
app.use("/api/site-visits", enquiryLimiter);
app.use("/site-visits", enquiryLimiter);


// --------------------------------------------------
// HEALTH CHECK & ROOT
// --------------------------------------------------

const healthCheck = (req, res) => {
  res.json({
    success: true,
    message: "Echo backend is running",
  });
};

app.get("/api/health", healthCheck);
app.get("/health", healthCheck);
app.get("/", healthCheck);


// --------------------------------------------------
// API ROUTES (Mounted on both /api and root paths)
// --------------------------------------------------

app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes);

app.use("/api/enquiries", enquiryRoutes);
app.use("/enquiries", enquiryRoutes);

app.use("/api/properties", propertyRoutes);
app.use("/properties", propertyRoutes);

app.use("/api/resorts", resortEnquiryRoutes);
app.use("/resorts", resortEnquiryRoutes);

app.use("/api/villas", villaEnquiryRoutes);
app.use("/villas", villaEnquiryRoutes);

app.use("/api/site-visits", siteVisitRoutes);
app.use("/site-visits", siteVisitRoutes);


// --------------------------------------------------
// API-ONLY 404 HANDLER
// --------------------------------------------------

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
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