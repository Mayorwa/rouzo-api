const express = require('express');
const bankController = require('../Controllers/Bank/LoadController');
const catchAsync = require('../utils/catchAsync');
const authGuard = require('../Guards/Auth');

const router = express.Router();

router.route('/').post(authGuard.guest, catchAsync(bankController.create));

router
  .route('/fetchOne/:id')
  .get(authGuard.guest, catchAsync(bankController.getOne));

router
  .route('/fetchAll')
  .get(authGuard.guest, catchAsync(bankController.getAll));

module.exports = router;
