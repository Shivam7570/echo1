const dotenv = require("dotenv");
dotenv.config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`\n==================================================`);
      console.log(`ℹ️ Port ${PORT} is ALREADY in use by a running backend server.`);
      console.log(`Server is currently active & accepting requests at http://localhost:${PORT}`);
      console.log(`==================================================\n`);
      process.exit(0);
    } else {
      console.error(`Server error: ${err.message}`);
      process.exit(1);
    }
  });
});

process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  process.exit(1);
});