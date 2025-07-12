const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    // Use local MongoDB if no Atlas URI is provided
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/rewear';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    console.log("Trying to connect to local MongoDB...");
    
    // Fallback to local MongoDB
    try {
      await mongoose.connect('mongodb://localhost:27017/rewear', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to local MongoDB");
    } catch (localErr) {
      console.error("Failed to connect to local MongoDB:", localErr.message);
      console.log("Please make sure MongoDB is installed and running locally");
      process.exit(1);
    }
  }
};

module.exports = connectDB;
