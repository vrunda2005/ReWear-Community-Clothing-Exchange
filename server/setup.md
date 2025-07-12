# ReWear Setup Guide

## Prerequisites

1. **Node.js** (v14 or higher)
2. **MongoDB** (local installation or MongoDB Atlas)

## Quick Setup

### Option 1: Local MongoDB (Recommended for development)

1. **Install MongoDB locally:**

   - Windows: Download from https://www.mongodb.com/try/download/community
   - Or use MongoDB Compass (GUI tool)

2. **Start MongoDB:**
   - Windows: MongoDB should run as a service
   - Or start manually: `mongod`

### Option 2: MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/atlas
2. Create a cluster
3. Get connection string
4. Add to `.env` file: `MONGO_URI=your_atlas_connection_string`

## Installation Steps

1. **Install backend dependencies:**

   ```bash
   cd server
   npm install
   ```

2. **Install frontend dependencies:**

   ```bash
   cd client
   npm install
   ```

3. **Create .env file in server directory:**

   ```
   PORT=5000
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
   MONGO_URI=mongodb://localhost:27017/rewear
   NODE_ENV=development
   ```

4. **Seed the database:**

   ```bash
   cd server
   node seedData.js
   ```

5. **Start the backend server:**

   ```bash
   cd server
   npm start
   ```

6. **Start the frontend:**
   ```bash
   cd client
   npm start
   ```

## Test User

After seeding the database, you can login with:

- **Email:** test@example.com
- **Password:** password123

## Features Available

✅ User registration and login
✅ Browse items on landing page
✅ Upload new items with images
✅ View item details
✅ Request swaps
✅ Admin panel for moderation
✅ User dashboard with profile and items

## Troubleshooting

### MongoDB Connection Issues

- Make sure MongoDB is running
- Check if port 27017 is available
- For Atlas: whitelist your IP address

### Image Upload Issues

- Make sure `server/uploads` directory exists
- Check file permissions
- Verify multer configuration

### Frontend Issues

- Clear browser cache
- Check browser console for errors
- Verify API endpoints match backend routes
