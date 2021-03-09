const express = require('express');
const portfolioController = require('../Controllers/Portfolio/LoadController');
const authGuard = require('../Guards/Auth');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

router
  .route('/')
  .post(catchAsync(authGuard.protect), catchAsync(portfolioController.create));

router
  .route('/getAll')
  .get(catchAsync(authGuard.protect), catchAsync(portfolioController.getAll));

router
  .route('/getOne/:id')
  .get(catchAsync(authGuard.protect), catchAsync(portfolioController.getOne));

router
  .route('/getAllRate')
  .get(
    catchAsync(authGuard.protect),
    catchAsync(portfolioController.getAllRate)
  );

router
  .route('/getOneRate/:id')
  .get(
    catchAsync(authGuard.protect),
    catchAsync(portfolioController.getOneRate)
  );

module.exports = router;
