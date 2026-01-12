const { findUserById } = require('../services/authService');

const getProfile = async (req, res) => {
  try {
    const user = await findUserById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching profile' });
  }
};

module.exports = {
  getProfile
};