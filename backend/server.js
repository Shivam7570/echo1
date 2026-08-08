const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Echo The Jungle Backend is running successfully",
  });
});

// Your API routes
app.use("/api/users", userRoutes);
app.use("/api/...", yourOtherRoutes);

// 404 route - THIS SHOULD BE AT THE END
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Not Found - ${req.originalUrl}`,
  });
});

module.exports = app;

// shivamrajpootshivam0_db_user 
// C3kGzo1Ql75GIqHQ