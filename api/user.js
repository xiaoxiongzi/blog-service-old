const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { SECRET_KEY } = require('../config');

router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  if (!name) return res.status(400).json({ message: '用户名不能为空' });
  if (!password) return res.status(400).json({ message: '密码不能为空' });
  const user = await User.findOne({ name }).select('+password');
  if (user) {
    const isMatch = user.comparePassword(password);
    if (isMatch) {
      const expiresIn = 24 * 60 * 60;
      const { id, admin } = user;
      const token = jwt.sign({ id, admin }, SECRET_KEY, { expiresIn });
      res.json({ token });
    } else {
      res.json({ code: 1, message: '密码错误！' });
    }
  } else {
    res.json({ code: 1, message: '用户不存在！' });
  }
});

router.post('/register', async (req, res) => {
  const { name, password } = req.body;
  if (!name) return res.status(400).json({ message: '用户名不能为空' });
  if (!password) return res.status(400).json({ message: '密码不能为空' });
  const user = await User.findOne({ name });
  if (user) return res.json({ code: 1, message: '用户名已存在！' });
  const newUser = new User({ name });
  newUser.password = newUser.encryptPassword(password);
  await newUser.save();
  res.json({ code: 0, message: '注册成功!' });
});

router.get('/info', async (req, res) => {
  const token = req.headers.authorization;
  const userId = jwt.verify(token.split(' ')[1], SECRET_KEY).id;
  const user = await User.findById(userId);
  res.json({ user });
});

module.exports = router;
