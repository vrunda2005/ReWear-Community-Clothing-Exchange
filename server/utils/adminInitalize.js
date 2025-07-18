const User = require('../models/User'); // Adjust path to your User model
const bcrypt = require('bcryptjs'); // Needed for hashing the password

const initializeAdminUser = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = "ReWear Admin"; // You can set a default name for the admin

  if (!adminEmail || !adminPassword) {
    console.warn("⚠️ ADMIN_EMAIL or ADMIN_PASSWORD not set in .env. Skipping admin user initialization.");
    return;
  }

  try {
    let adminUser = await User.findOne({ email: adminEmail });

    if (!adminUser) {
      // Admin user does not exist, create it
      console.log(`Creating new admin user: ${adminEmail}`);
      adminUser = await User.create({
        name: adminName,
        email: adminEmail,
        password: adminPassword, // Password will be hashed by the pre-save hook in User model
        isAdmin: true,
      });
      console.log(`✅ Admin user "${adminEmail}" created successfully.`);
    } else {
      // Admin user exists, ensure they are marked as admin
      if (!adminUser.isAdmin) {
        adminUser.isAdmin = true;
        await adminUser.save();
        console.log(`✅ Existing user "${adminEmail}" updated to be an admin.`);
      } else {
        console.log(`ℹ️ Admin user "${adminEmail}" already exists and is an admin.`);
      }
    }
  } catch (error) {
    console.error('❌ Error initializing admin user:', error);
    // If it's a duplicate key error (e.g., email already exists but not as admin),
    // the findOne and update logic above should handle it, but catch general errors.
  }
};

module.exports = initializeAdminUser;