const Item = require('../models/Item');
const User = require('../models/User');
const path = require('path');

// Create new item
exports.createItem = async (req, res) => {
  try {
    const { title, description, category, type, size, condition, tags } = req.body;
    
    // Handle image uploads
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map(file => `/uploads/${file.filename}`);
    }

    // Validate required fields
    if (!title || !description || !category || !type || !size || !condition) {
      return res.status(400).json({ 
        message: 'Missing required fields: title, description, category, type, size, condition' 
      });
    }

    const item = await Item.create({
      title,
      description,
      category,
      type,
      size,
      condition,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      images,
      uploader: req.user.userId,
      status: 'pending',
      approved: false
    });

    // Populate uploader info for response
    await item.populate('uploader', 'name email');

    res.status(201).json({
      message: 'Item created successfully! It will be reviewed by our team.',
      item
    });
  } catch (err) {
    console.error('Create Item Error:', err);
    res.status(500).json({ 
      message: 'Error creating item', 
      error: err.message 
    });
  }
};

// Get all approved items (for public)
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find({ approved: true }).populate('uploader', 'name email avatarUrl');
    
    res.json(items);
  } catch (err) {
    console.error('Get All Items Error:', err);
    res.status(500).json({ message: 'Error fetching items', error: err.message });
  }
};

// Get item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('uploader', 'name email avatarUrl');
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    console.error('Get Item Error:', err);
    res.status(500).json({ message: 'Error fetching item', error: err.message });
  }
};

// Get items uploaded by current user
exports.getMyItems = async (req, res) => {
  try {
    const items = await Item.find({ uploader: req.user.userId });
    res.json(items);
  } catch (err) {
    console.error('Get My Items Error:', err);
    res.status(500).json({ message: 'Error fetching user items', error: err.message });
  }
};

// Admin: Get all pending items
exports.getPendingItems = async (req, res) => {
  try {
    const items = await Item.find({ approved: false }).populate('uploader', 'name email');
    res.json(items);
  } catch (err) {
    console.error('Get Pending Items Error:', err);
    res.status(500).json({ message: 'Error fetching pending items', error: err.message });
  }
};

// Admin: Approve item
exports.approveItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id, 
      { approved: true, status: 'available' }, 
      { new: true }
    ).populate('uploader', 'name email');
    
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    console.error('Approve Item Error:', err);
    res.status(500).json({ message: 'Error approving item', error: err.message });
  }
};

// Admin: Reject (delete) item
exports.rejectItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item rejected and deleted' });
  } catch (err) {
    console.error('Reject Item Error:', err);
    res.status(500).json({ message: 'Error rejecting item', error: err.message });
  }
};

// Remove item (admin or owner)
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    
    if (item.uploader.toString() !== req.user.userId && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await item.deleteOne();
    res.json({ message: 'Item deleted' });
  } catch (err) {
    console.error('Delete Item Error:', err);
    res.status(500).json({ message: 'Error deleting item', error: err.message });
  }
}; 