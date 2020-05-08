const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const cors = require('cors');
const { DB_URL, SECRET_KEY } = require('./config');
require('express-async-errors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 设置跨域
app.use(cors({
  credentials: true,
  origin: ['http://xiaoxiongzi.cn', 'http://wensy.cn'],
}));

// 设置管理后台（除了登录注册）的接口需要认证访问
app.use(expressJWT({ secret: SECRET_KEY }).unless({
  path: ['/api/console/user/login', '/api/console/user/register', /^\/api\/client\/*/]
}));

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send('invalid token');
  }
  next();
});

app.use('/api/console', require('./api/console'));
app.use('/api/client', require('./api/client'));

const port = 3000;
mongoose.connect(DB_URL).then(() => {
  app.listen(port, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`server start at http://localhost:${port}`);
    }
  });
});
