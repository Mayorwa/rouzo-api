const express = require('express');
const accountController = require('../Controllers/Account/LoadController');
const catchAsync = require('../utils/catchAsync');
const authGuard = require('../Guards/Auth');

const router = express.Router();

router
  .route('/createBankDetails')
  .post(authGuard.protect, catchAsync(accountController.createBankDetails));

router
  .route('/updateBankDetails')
  .patch(authGuard.protect, catchAsync(accountController.updateBankDetails));

router
  .route('/updateProfile')
  .patch(authGuard.protect, catchAsync(accountController.updateProfile));

module.exports = router;
