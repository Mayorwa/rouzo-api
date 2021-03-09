const express = require('express');
const couponController = require('../Controllers/Coupon/LoadController');
const catchAsync = require('../utils/catchAsync');
const authGuard = require('../Guards/Auth');

const router = express.Router();

router.route('/').post(authGuard.guest, catchAsync(couponController.create));

router
  .route('/fetchOne/:id')
  .get(authGuard.guest, catchAsync(couponController.getOne));

module.exports = router;
