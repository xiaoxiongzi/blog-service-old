const express = require('express');
const qiniu = require('qiniu');
const router = express.Router();
const Tag = require('../models/tag');
const Category = require('../models/category');
const Post = require('../models/post');
const { QINIU } = require('../config');
const { authorize } = require('../middleware');

router.post('/', async (req, res) => {
  const {
    title, category, tags, summary,
    text, publish, id
  } = req.body;
  const postData = {
    title, category, tags, summary, text, publish
  };
  if (id) {
    await Post.findByIdAndUpdate(id, postData);
    return res.json({ code: 0, message: 'success' });
  }
  await new Post(postData).save();
  return res.json({ code: 0, message: 'success' });
});

router.get('/', async (req, res) => {
  const { id } = req.query;
  const post = await Post.findById(id);
  return res.json({ post });
});

router.post('/tag', ...authorize(), async (req, res) => {
  const { name } = req.body;
  const tag = await Tag.findOne({ name });
  if (tag) {
    res.json({
      code: 1, message: `“${name}”标签已存在！`
    });
  } else {
    await new Tag({ name }).save();
    res.json({ code: 0, message: 'success' });
  }
});

router.post('/category', ...authorize(), async (req, res) => {
  const { name } = req.body;
  const category = await Category.findOne({ name });
  if (category) {
    res.json({
      code: 1, message: `“${name}”分类已存在！`
    });
  } else {
    await new Category({ name }).save();
    res.json({ code: 0, message: 'success' });
  }
});

router.get('/tag', async (req, res) => {
  const tagList = await Tag.find();
  res.json({ code: 0, tagList });
});

router.get('/category', async (req, res) => {
  const categoryList = await Category.find();
  res.json({ code: 0, categoryList });
});

router.get('/upload/token', ...authorize(), async (req, res) => {
  const { ACCESS_KEY, SECRET_KEY, BUCKET } = QINIU;
  const mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);
  const options = {
    scope: BUCKET,
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);
  res.json({ uploadToken });
});


module.exports = router;
