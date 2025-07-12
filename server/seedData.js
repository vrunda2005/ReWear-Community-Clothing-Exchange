const mongoose = require('mongoose');
const Item = require('./models/Item');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/rewear', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleItems = [
  {
    title: 'Vintage Denim Jacket',
    description: 'Classic blue denim jacket in excellent condition. Perfect for layering in any season.',
    category: 'Outerwear',
    type: 'Jacket',
    size: 'M',
    condition: 'Good',
    tags: ['vintage', 'denim', 'casual', 'streetwear'],
    images: ['https://via.placeholder.com/400x300/2196F3/FFFFFF?text=Vintage+Denim+Jacket'],
    status: 'available',
    approved: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
  },
  {
    title: 'Black Formal Shirt',
    description: 'Elegant black formal shirt suitable for office wear and special occasions.',
    category: 'Formals',
    type: 'Shirt',
    size: 'L',
    condition: 'Like New',
    tags: ['formal', 'office', 'business', 'elegant'],
    images: ['https://via.placeholder.com/400x300/000000/FFFFFF?text=Black+Formal+Shirt'],
    status: 'available',
    approved: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
  },
  {
    title: 'Summer Floral Dress',
    description: 'Beautiful floral print dress perfect for summer days and garden parties.',
    category: 'Dresses',
    type: 'Dress',
    size: 'S',
    condition: 'New',
    tags: ['summer', 'floral', 'dress', 'casual'],
    images: ['https://via.placeholder.com/400x300/E91E63/FFFFFF?text=Summer+Floral+Dress'],
    status: 'available',
    approved: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
  },
  {
    title: 'White T-Shirt',
    description: 'Comfortable cotton t-shirt in classic white. Great for everyday wear.',
    category: 'T-Shirts',
    type: 'Shirt',
    size: 'M',
    condition: 'Good',
    tags: ['casual', 'cotton', 'basic', 'everyday'],
    images: ['https://via.placeholder.com/400x300/FFFFFF/000000?text=White+T-Shirt'],
    status: 'available',
    approved: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  },
  {
    title: 'Leather Handbag',
    description: 'Stylish brown leather handbag with multiple compartments. Perfect for work or casual use.',
    category: 'Accessories',
    type: 'Bag',
    size: 'One Size',
    condition: 'Good',
    tags: ['leather', 'handbag', 'accessory', 'stylish'],
    images: ['https://via.placeholder.com/400x300/795548/FFFFFF?text=Leather+Handbag'],
    status: 'available',
    approved: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
  },
  {
    title: 'Blue Jeans',
    description: 'Classic blue jeans with a comfortable fit. Great for casual outings.',
    category: 'Jeans',
    type: 'Pants',
    size: '32',
    condition: 'Fair',
    tags: ['jeans', 'casual', 'denim', 'comfortable'],
    images: ['https://via.placeholder.com/400x300/2196F3/FFFFFF?text=Blue+Jeans'],
    status: 'available',
    approved: true,
    createdAt: new Date()
  }
];

const seedData = async () => {
  try {
    // Clear existing items
    await Item.deleteMany({});
    console.log('Cleared existing items');

    // Create a test user if it doesn't exist
    let testUser = await User.findOne({ email: 'test@example.com' });
    if (!testUser) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      testUser = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: hashedPassword,
        points: 100,
        isAdmin: false
      });
      console.log('Created test user');
    }

    // Add uploader ID to all items
    const itemsWithUploader = sampleItems.map(item => ({
      ...item,
      uploader: testUser._id
    }));

    // Insert sample items
    await Item.insertMany(itemsWithUploader);
    console.log('Added sample items to database');

    console.log('Seed data completed successfully!');
    console.log('Test user: test@example.com / password123');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData(); 