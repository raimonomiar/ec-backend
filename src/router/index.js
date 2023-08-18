const express = require('express');

const router = express.Router();
router.use('/health', require('./health'));
router.use('/users', require('./users'));
router.use('/', require('./auth'));
router.use('/products', require('./products'));

module.exports = router;
