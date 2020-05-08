const express = require('express');
const router = express.Router();

router.use('/post', require('./post'));
router.use('/list', require('./list'));
router.use('/user', require('./user'));

module.exports = router;
