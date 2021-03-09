const express = require('express');
const guarantorController = require('../Controllers/Guarantor/LoadController');
const catchAsync = require('../utils/catchAsync');
const authGuard = require('../Guards/Auth');

const router = express.Router();

router
  .route('/create')
  .post(
    authGuard.protect,
    catchAsync(authGuard.isBusiness),
    catchAsync(guarantorController.createGuarantor)
  );

module.exports = router;
