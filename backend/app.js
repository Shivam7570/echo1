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

const { getStats } = require("./controllers/enquiryController");
const {
  requestResetCode,
  verifyResetCode,
  requestEmailConfirmationLink,
  verifyEmailConfirmationToken,
  confirmNewPassword,
} = require("./controllers/authController");

app.get("/api/health", healthCheck);
app.get("/health", healthCheck);
app.get("/", healthCheck);
app.get("/api/stats", getStats);
app.get("/stats", getStats);

app.post("/api/auth/request-email-confirmation", requestEmailConfirmationLink);
app.post("/auth/request-email-confirmation", requestEmailConfirmationLink);
app.post("/api/request-email-confirmation", requestEmailConfirmationLink);
app.post("/request-email-confirmation", requestEmailConfirmationLink);

app.post("/api/auth/verify-reset-token", verifyEmailConfirmationToken);
app.post("/auth/verify-reset-token", verifyEmailConfirmationToken);
app.post("/api/verify-reset-token", verifyEmailConfirmationToken);
app.post("/verify-reset-token", verifyEmailConfirmationToken);

app.post("/api/auth/confirm-new-password", confirmNewPassword);
app.post("/auth/confirm-new-password", confirmNewPassword);
app.post("/api/confirm-new-password", confirmNewPassword);
app.post("/confirm-new-password", confirmNewPassword);

app.post("/api/auth/request-reset-code", requestResetCode);
app.post("/auth/request-reset-code", requestResetCode);
app.post("/api/request-reset-code", requestResetCode);
app.post("/request-reset-code", requestResetCode);

app.post("/api/auth/verify-reset-password", verifyResetCode);
app.post("/auth/verify-reset-password", verifyResetCode);
app.post("/api/verify-reset-password", verifyResetCode);
app.post("/verify-reset-password", verifyResetCode);




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