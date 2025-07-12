# ReWear - Community Clothing Exchange Platform

A sustainable fashion platform where users can swap clothes, earn points, and give their wardrobe a new life while helping the environment.

## 🚀 Quick Start

### Option 1: One-Click Start (Windows)

```bash
# Double-click the start-app.bat file or run:
start-app.bat
```

### Option 2: Manual Start

```bash
# 1. Start Backend
cd server
npm install
npm start

# 2. Start Frontend (in new terminal)
cd client
npm install
npm start
```

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ReWear-Community-Clothing-Exchange
   ```

2. **Install dependencies**

   ```bash
   # Backend dependencies
   cd server
   npm install

   # Frontend dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables**
   Create `server/.env` file:

   ```
   PORT=5000
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
   MONGO_URI=mongodb://localhost:27017/rewear
   NODE_ENV=development
   ```

4. **Seed the database**

   ```bash
   cd server
   node seedData.js
   ```

5. **Start the application**

   ```bash
   # Backend (Terminal 1)
   cd server
   npm start

   # Frontend (Terminal 2)
   cd client
   npm start
   ```

## 👤 Test Account

After seeding the database, you can login with:

- **Email:** test@example.com
- **Password:** password123

## ✨ Features

### 🔐 Authentication

- User registration and login
- JWT-based authentication
- Protected routes
- User profile management

### 🛍️ Item Management

- Upload items with multiple images
- Item categorization and tagging
- Condition and size specifications
- Admin approval system

### 🔄 Swap System

- Request item swaps
- Points-based redemption
- Swap history tracking
- Status management (pending, approved, completed)

### 👨‍💼 Admin Panel

- Item moderation
- User management
- Approve/reject items
- Platform statistics

### 🎨 User Interface

- Responsive design
- Modern Material-UI components
- Image galleries
- Search and filtering

## 🏗️ Architecture

### Backend (Node.js/Express)

```
server/
├── config/
│   └── db.js              # Database configuration
├── controllers/
│   ├── authController.js  # Authentication logic
│   ├── itemController.js  # Item management
│   └── swapController.js  # Swap operations
├── middleware/
│   ├── authMiddleware.js  # JWT authentication
│   ├── uploadMiddleware.js # File upload handling
│   └── errorMiddleware.js # Error handling
├── models/
│   ├── User.js           # User schema
│   ├── Item.js           # Item schema
│   └── Swap.js           # Swap schema
├── routes/
│   ├── authRoutes.js     # Authentication routes
│   ├── itemRoutes.js     # Item routes
│   └── swapRoutes.js     # Swap routes
└── server.js             # Main server file
```

### Frontend (React/TypeScript)

```
client/src/
├── components/
│   └── auth/
│       ├── Login.tsx     # Login component
│       └── Signup.tsx    # Registration component
├── context/
│   └── AuthContext.tsx   # Authentication context
├── pages/
│   ├── Landingpage.tsx   # Home page
│   ├── Dashboard.tsx     # User dashboard
│   ├── AddItem.tsx       # Item upload
│   ├── ItemDetail.tsx    # Item details
│   ├── AdminPanel.tsx    # Admin interface
│   └── swapswiper.tsx    # Swap interface
├── services/
│   └── api.ts           # API service
└── App.tsx              # Main app component
```

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Items

- `GET /api/items` - Get all approved items
- `GET /api/items/:id` - Get item by ID
- `POST /api/items` - Create new item
- `GET /api/items/my/items` - Get user's items
- `DELETE /api/items/:id` - Delete item

### Swaps

- `POST /api/swaps` - Create swap request
- `GET /api/swaps/my` - Get user's swaps
- `PATCH /api/swaps/:id/approve` - Approve swap
- `PATCH /api/swaps/:id/reject` - Reject swap

### Admin

- `GET /api/items/admin/pending` - Get pending items
- `PATCH /api/items/admin/approve/:id` - Approve item
- `DELETE /api/items/admin/reject/:id` - Reject item

## 🖼️ Image Handling

- **Upload:** Multer middleware handles file uploads
- **Storage:** Images stored in `server/uploads/` directory
- **Serving:** Static file serving via Express
- **Fallback:** Placeholder images for missing files

## 🗄️ Database Schema

### User

```javascript
{
  name: String,
  email: String,
  password: String (hashed),
  points: Number,
  isAdmin: Boolean,
  createdAt: Date
}
```

### Item

```javascript
{
  title: String,
  description: String,
  category: String,
  type: String,
  size: String,
  condition: String,
  tags: [String],
  images: [String],
  uploader: ObjectId (ref: User),
  status: String,
  approved: Boolean,
  createdAt: Date
}
```

### Swap

```javascript
{
  item: ObjectId (ref: Item),
  requester: ObjectId (ref: User),
  type: String ('swap' | 'points'),
  status: String ('pending' | 'approved' | 'rejected' | 'completed'),
  createdAt: Date
}
```

## 🚀 Deployment

### Backend Deployment

1. Set environment variables
2. Install dependencies: `npm install --production`
3. Start server: `npm start`

### Frontend Deployment

1. Build: `npm run build`
2. Serve static files from `dist/` directory

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running locally
- Check connection string in `.env`
- For Atlas: whitelist your IP address

### Image Upload Issues

- Verify `server/uploads/` directory exists
- Check file permissions
- Ensure multer is properly configured

### Frontend Issues

- Clear browser cache
- Check browser console for errors
- Verify API endpoints match backend routes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Material-UI for the component library
- MongoDB for the database
- Express.js for the backend framework
- React for the frontend framework

---

**ReWear** - Sustainable fashion for a better tomorrow! ♻️👕
