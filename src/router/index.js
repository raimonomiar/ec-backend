const express = require('express');

const router = express.Router();
router.use('/health', require('./health'));
router.use('/users', require('./users'));
router.use('/', require('./auth'));
router.use('/products', require('./products'));
router.use('/category', require('./category'));
router.use('/cart', require('./cart'));

module.exports = router;
