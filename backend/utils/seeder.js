// Run with: npm run seed
// Creates a default admin user if one doesn't already exist.
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("../config/db");
const User = require("../models/User");
const mongoose = require("mongoose");

const seedAdmin = async () => {
  await connectDB();

  const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@echoresort.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "Admin@123";

  const exists = await User.findOne({ email: adminEmail });
  if (exists) {
    console.log(`Admin user already exists: ${adminEmail}`);
  } else {
    await User.create({
      name: "Echo Admin",
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    });
    console.log(`Admin user created -> email: ${adminEmail}, password: ${adminPassword}`);
    console.log("Please change this password after first login.");
  }

  await mongoose.connection.close();
  process.exit();
};

seedAdmin();
