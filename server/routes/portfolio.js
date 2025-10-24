const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Portfolio = require('../models/Portfolio');

// Get current user's portfolio
router.get('/', auth, async (req, res) => {
  try {
    let p = await Portfolio.findOne({ user: req.user.id });
    if (!p) {
      p = new Portfolio({ user: req.user.id });
      await p.save();
    }
    res.json(p);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update portfolio
router.post('/', auth, async (req, res) => {
  try {
    const data = req.body;
    let p = await Portfolio.findOneAndUpdate({ user: req.user.id }, { ...data, updatedAt: Date.now() }, { new: true, upsert: true });
    res.json(p);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Public fetch by user id (for preview/public portfolio)
router.get('/public/:userId', async (req, res) => {
  try {
    const p = await Portfolio.findOne({ user: req.params.userId }).populate('user', ['name']);
    if (!p) return res.status(404).json({ msg: 'Not found' });
    res.json(p);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// Delete current user's portfolio


module.exports = router;