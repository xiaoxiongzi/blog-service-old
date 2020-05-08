const config = {
  // 开发环境
  development: {
    DB_URL: 'your mongodb address', // 数据库地址
    SECRET_KEY: 'your jwt secret key', // JWT SECRET KY
    // 七牛云相关配置
    QINIU: {
      ACCESS_KEY: 'your access key',
      SECRET_KEY: 'your secret key',
      BUCKET: 'your bucket',
      DOMIN_NAME: 'your domin name'
    }
  },
  // 线上环境
  production: {
    DB_URL: 'your mongodb address',
    SECRET_KEY: 'your jwt secret key',
    QINIU: {
      ACCESS_KEY: 'your access key',
      SECRET_KEY: 'your secret key',
      BUCKET: 'your bucket',
      DOMIN_NAME: 'your domin name'
    }
  },
};
const env = process.env.NODE_ENV || 'development';
module.exports = config[env];
