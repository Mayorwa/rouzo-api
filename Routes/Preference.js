const express = require('express');
const preferenceController = require('../Controllers/Preference/LoadController');
const catchAsync = require('../utils/catchAsync');
const authGuard = require('../Guards/Auth');

const router = express.Router();

router
  .route('/')
  .post(authGuard.guest, catchAsync(preferenceController.create));

module.exports = router;
