const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');
const initializeAdminUser = require('./utils/adminInitalize'); 

const path = require('path');

dotenv.config();
connectDB().then(()=>{
      console.log('Database connection established. Now initializing admin user...');

    initializeAdminUser(); 
});

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Mount the auth routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/swaps', require('./routes/swapRoutes'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => res.send('API Running'));

// Error handling middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
