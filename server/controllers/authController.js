const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// signup and login functions below...


exports.signup = async (req, res) => {
  try {
    const { name, email, password, avatarUrl } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      avatarUrl
    });

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        name: user.name,
        email: user.email,
        points: user.points,
        isAdmin: user.isAdmin
      }
    });
  } catch (err) {
    console.error('Signup Error:', err);  // <-- log the error
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      token,
      user: {
        name: user.name,
        email: user.email,
        points: user.points,
        isAdmin: user.isAdmin
      }
    });
  } catch (err) {
    console.error('Login Error:', err);  // <-- log the error
    res.status(500).json({ message: 'Server error' });
  }
};
