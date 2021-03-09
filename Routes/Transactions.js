const express = require('express');
const transactionController = require('../Controllers/Transactions/LoadController');
const catchAsync = require('../utils/catchAsync');
const authGuard = require('../Guards/Auth');

const router = express.Router();

router
  .route('/initialize')
  .post(authGuard.protect, catchAsync(transactionController.initialize));

module.exports = router;
