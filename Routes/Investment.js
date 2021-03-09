const express = require('express');
const investmentController = require('../Controllers/Investment/LoadController');
const authGuard = require('../Guards/Auth');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

router
  .route('/')
  .post(catchAsync(authGuard.protect), catchAsync(investmentController.create));
module.exports = router;
