const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  const cloudURI = process.env.MONGO_URI;

  if (!cloudURI) {
    console.error("❌ MONGO_URI not found in .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(cloudURI); // Default options work for modern Mongoose
    console.log("✅ MongoDB Connected Successfully to Atlas (Cloud)");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB Atlas:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
