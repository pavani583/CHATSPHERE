// Simple middleware to check user by id in header (for this mini-project)
const User = require('../models/User');
module.exports = async (req, res, next) => {
  try {
    const userId = req.header('x-user-id');
    if (!userId) return res.status(401).json({ msg: 'No user header' });
    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ msg: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};