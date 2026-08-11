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

const app = express();


// --------------------------------------------------
// CORE MIDDLEWARE
// --------------------------------------------------



// Enable CORS for all routes (or restrict it to your domain)
app.use(cors({
  origin: ['https://echothejungle.com', 'https://www.echothejungle.com'],
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
// API-ONLY 404 HANDLER
// --------------------------------------------------
// This server only serves /api/* routes.
// Frontend (React/Vite) is deployed separately on echothejungle.com,
// so there's no client/dist here to fall back to.

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