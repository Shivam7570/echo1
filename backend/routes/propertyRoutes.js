const express = require("express");
const router = express.Router();
const {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Public
router.get("/", getProperties);
router.get("/:id", getPropertyById);

// Admin only
router.post("/", protect, authorize("admin", "editor"), createProperty);
router.put("/:id", protect, authorize("admin", "editor"), updateProperty);
router.delete("/:id", protect, authorize("admin"), deleteProperty);

module.exports = router;
