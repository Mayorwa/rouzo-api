const express = require('express');
const fundController = require('../Controllers/Fund/LoadController');
const catchAsync = require('../utils/catchAsync');
const authGuard = require('../Guards/Auth');

const router = express.Router();

router
  .route('/create')
  .post(
    authGuard.protect,
    catchAsync(authGuard.isBusiness),
    catchAsync(fundController.create)
  );

router
  .route('/')
  .get(
    authGuard.protect,
    catchAsync(authGuard.isBusiness),
    catchAsync(fundController.fetchAll)
  );

router
  .route('/:id')
  .get(
    authGuard.protect,
    catchAsync(authGuard.isBusiness),
    catchAsync(fundController.fetchOne)
  );

router
  .route('/:id')
  .patch(
    authGuard.protect,
    catchAsync(authGuard.isBusiness),
    catchAsync(fundController.fetchOne)
  );

module.exports = router;
