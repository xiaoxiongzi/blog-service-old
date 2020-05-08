const expressJWT = require('express-jwt');
const { SECRET_KEY } = require('../config');
// 权限校验
const authorize = () => {
  return [
    expressJWT({ secret: SECRET_KEY }),
    (req, res, next) => {
      if (!req.user.admin) {
        return res.status(403).json({ message: '暂无权限' });
      }
      next();
    }
  ];
};
module.exports = {
  authorize
};
