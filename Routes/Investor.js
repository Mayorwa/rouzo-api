const express = require('express');
const investorController = require('../Controllers/Investor/LoadController');
const catchAsync = require('../utils/catchAsync');
const authGuard = require('../Guards/Auth');

const router = express.Router();

router.route('/').post(authGuard.guest, catchAsync(investorController.create));

router
  .route('/stashDetails')
  .get(
    authGuard.protect,
    authGuard.isInvestor,
    catchAsync(investorController.getStashDetails)
  );
module.exports = router;
