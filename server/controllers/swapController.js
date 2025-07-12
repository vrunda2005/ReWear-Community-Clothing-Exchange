const Swap = require('../models/Swap');
const Item = require('../models/Item');

// Create a swap request
exports.createSwap = async (req, res) => {
  try {
    const { itemId, type } = req.body;
    const swap = await Swap.create({
      item: itemId,
      requester: req.user.userId,
      type,
      status: 'pending'
    });
    res.status(201).json(swap);
  } catch (err) {
    res.status(500).json({ message: 'Error creating swap', error: err.message });
  }
};

// Get swaps for current user
exports.getMySwaps = async (req, res) => {
  try {
    const swaps = await Swap.find({ requester: req.user.userId }).populate('item');
    res.json(swaps);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching swaps', error: err.message });
  }
};

// Get swaps for an item (for uploader)
exports.getItemSwaps = async (req, res) => {
  try {
    const swaps = await Swap.find({ item: req.params.itemId }).populate('requester', 'name email');
    res.json(swaps);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching item swaps', error: err.message });
  }
};

// Update swap status (approve/reject/complete)
exports.updateSwapStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const swap = await Swap.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!swap) return res.status(404).json({ message: 'Swap not found' });
    // If completed, mark item as swapped
    if (status === 'completed') {
      await Item.findByIdAndUpdate(swap.item, { status: 'swapped' });
    }
    res.json(swap);
  } catch (err) {
    res.status(500).json({ message: 'Error updating swap', error: err.message });
  }
}; 