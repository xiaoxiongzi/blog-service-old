const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const { authorize } = require('../middleware');

router.post('/', async (req, res) => {
  const { pageSize, currentPage } = req.body;
  const total = await Post.find().countDocuments();
  const skip = (currentPage - 1) * pageSize;
  const list = await Post.find().sort({ _id: -1 }).skip(skip).limit(pageSize);
  return res.json({ total, list });
});

router.delete('/', ...authorize(), async (req, res) => {
  const { id } = req.query;
  await Post.findByIdAndRemove(id);
  return res.json({ message: 'success' });
});

router.put('/', ...authorize(), async (req, res) => {
  const { id, publish } = req.body;
  await Post.findByIdAndUpdate(id, { publish });
  return res.json({ message: 'success', publish });
});

module.exports = router;
