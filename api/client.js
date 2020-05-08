const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Tag = require('../models/tag');
const Category = require('../models/category');

router.get('/tag', async (req, res) => {
  const tagList = await Tag.find();
  res.json({ tagList });
});

router.get('/category', async (req, res) => {
  const categoryList = await Category.find();
  res.json({ categoryList });
});

router.post('/list', async (req, res) => {
  const { pageSize, currentPage } = req.body;
  const total = await Post.find().countDocuments();
  const skip = (currentPage - 1) * pageSize;
  const list = await Post.find().sort({ _id: -1 }).skip(skip).limit(pageSize);
  return res.json({ total, list });
});

router.get('/detail', async (req, res) => {
  const { id } = req.query;
  const post = await Post.findById(id);
  return res.json({ post });
});

module.exports = router;
