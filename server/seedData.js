const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Item = require('./models/Item');
const User = require('./models/User');

dotenv.config(); // Load .env for MONGO_URI

const MONGO_URI = process.env.MONGO_URI;

const sampleItems = [
  {
    title: 'Vintage Denim Jacket',
    description: 'Classic blue denim jacket in excellent condition.',
    category: 'Outerwear',
    type: 'Jacket',
    size: 'M',
    condition: 'Good',
    tags: ['vintage', 'denim', 'casual'],
    images: ['https://via.placeholder.com/400x300/2196F3/FFFFFF?text=Vintage+Denim+Jacket'],
    status: 'available',
    approved: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Black Formal Shirt',
    description: 'Elegant black formal shirt suitable for office wear.',
    category: 'Formals',
    type: 'Shirt',
    size: 'L',
    condition: 'Like New',
    tags: ['formal', 'office'],
    images: ['https://via.placeholder.com/400x300/000000/FFFFFF?text=Black+Formal+Shirt'],
    status: 'available',
    approved: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  }
];

const demoUsers = [
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    password: 'alicepass',
    points: 120,
    avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
    isAdmin: false
  },
  {
    name: 'Bob Smith',
    email: 'bob@example.com',
    password: 'bobpass',
    points: 80,
    avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
    isAdmin: false
  },
  {
    name: 'Carol Lee',
    email: 'carol@example.com',
    password: 'carolpass',
    points: 150,
    avatarUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    isAdmin: false
  },
  {
    name: 'Dave Brown',
    email: 'dave@example.com',
    password: 'davepass',
    points: 60,
    avatarUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
    isAdmin: false
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing items
    await Item.deleteMany({});
    console.log('🧹 Cleared existing items');

    // Create test user
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
      console.log('👤 Created test user');
    }

    // Create admin user
    let adminUser = await User.findOne({ email: 'admin@example.com' });
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        points: 999,
        isAdmin: true
      });
      console.log('🛡️  Created admin user');
    }

    // Create demo users
    const userDocs = [];
    for (const user of demoUsers) {
      let userDoc = await User.findOne({ email: user.email });
      if (!userDoc) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        userDoc = await User.create({
          ...user,
          password: hashedPassword
        });
        console.log(`👤 Created user: ${user.email}`);
      }
      userDocs.push(userDoc);
    }

    // Assign uploader to test user for sample items
    const itemsWithUploader = sampleItems.map(item => ({
      ...item,
      uploader: testUser._id
    }));

    await Item.insertMany(itemsWithUploader);
    console.log('📦 Sample items added');

    // Create demo items for each user
    const demoItems = [
      // Alice's items
      {
        title: 'Red Summer Dress',
        description: 'Lightweight red dress, perfect for summer.',
        category: 'Dresses',
        type: 'Dress',
        size: 'S',
        condition: 'Like New',
        tags: ['summer', 'red', 'casual'],
        images: ['https://via.placeholder.com/400x300/FF5252/FFFFFF?text=Red+Summer+Dress'],
        status: 'available',
        approved: true,
        uploader: userDocs[0]._id
      },
      {
        title: 'Blue Jeans',
        description: 'Classic blue jeans, slightly worn.',
        category: 'Bottoms',
        type: 'Jeans',
        size: 'M',
        condition: 'Good',
        tags: ['jeans', 'blue', 'casual'],
        images: ['https://via.placeholder.com/400x300/2196F3/FFFFFF?text=Blue+Jeans'],
        status: 'available',
        approved: true,
        uploader: userDocs[0]._id
      },
      // Bob's items
      {
        title: 'Green Hoodie',
        description: 'Comfy green hoodie for chilly days.',
        category: 'Outerwear',
        type: 'Hoodie',
        size: 'L',
        condition: 'Good',
        tags: ['hoodie', 'green', 'warm'],
        images: ['https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=Green+Hoodie'],
        status: 'available',
        approved: true,
        uploader: userDocs[1]._id
      },
      {
        title: 'Black Sneakers',
        description: 'Stylish black sneakers, barely used.',
        category: 'Footwear',
        type: 'Sneakers',
        size: '42',
        condition: 'Like New',
        tags: ['sneakers', 'black', 'shoes'],
        images: ['https://via.placeholder.com/400x300/000000/FFFFFF?text=Black+Sneakers'],
        status: 'available',
        approved: true,
        uploader: userDocs[1]._id
      },
      // Carol's items
      {
        title: 'Yellow Raincoat',
        description: 'Bright yellow raincoat, waterproof.',
        category: 'Outerwear',
        type: 'Raincoat',
        size: 'M',
        condition: 'Excellent',
        tags: ['raincoat', 'yellow', 'waterproof'],
        images: ['https://via.placeholder.com/400x300/FFEB3B/000000?text=Yellow+Raincoat'],
        status: 'available',
        approved: true,
        uploader: userDocs[2]._id
      },
      {
        title: 'White Blouse',
        description: 'Elegant white blouse for formal occasions.',
        category: 'Tops',
        type: 'Blouse',
        size: 'S',
        condition: 'Like New',
        tags: ['blouse', 'white', 'formal'],
        images: ['https://via.placeholder.com/400x300/FFFFFF/000000?text=White+Blouse'],
        status: 'available',
        approved: true,
        uploader: userDocs[2]._id
      },
      // Dave's items
      {
        title: 'Brown Leather Belt',
        description: 'Genuine leather belt, brown color.',
        category: 'Accessories',
        type: 'Belt',
        size: 'M',
        condition: 'Good',
        tags: ['belt', 'leather', 'brown'],
        images: ['https://via.placeholder.com/400x300/795548/FFFFFF?text=Leather+Belt'],
        status: 'available',
        approved: true,
        uploader: userDocs[3]._id
      },
      {
        title: 'Grey Beanie',
        description: 'Warm grey beanie for winter.',
        category: 'Accessories',
        type: 'Beanie',
        size: 'One Size',
        condition: 'Excellent',
        tags: ['beanie', 'grey', 'winter'],
        images: ['https://via.placeholder.com/400x300/9E9E9E/FFFFFF?text=Grey+Beanie'],
        status: 'available',
        approved: true,
        uploader: userDocs[3]._id
      }
    ];

    await Item.insertMany(demoItems);
    console.log('📦 Demo items for all users added');

    console.log('\n✅ Seeding complete!');
    console.log('Login as:');
    console.log('Test user ➤ Email: test@example.com | Password: password123');
    console.log('Admin user ➤ Email: admin@example.com | Password: admin123');
    demoUsers.forEach(u => {
      console.log(`${u.name} ➤ Email: ${u.email} | Password: ${u.password}`);
    });

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seedData();
