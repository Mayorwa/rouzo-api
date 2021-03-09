const express = require('express');
const stashController = require('../Controllers/Stash/LoadController');
const savingController = require('../Controllers/Saving/LoadController');
const catchAsync = require('../utils/catchAsync');
const authGuard = require('../Guards/Auth');

const router = express.Router();

router
  .route('/investor/credit')
  .post(authGuard.protect, catchAsync(stashController.credit));

router
  .route('/investor/save')
  .post(authGuard.protect, catchAsync(savingController.create));
module.exports = router;
