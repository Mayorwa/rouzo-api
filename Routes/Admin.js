const express = require('express');
const adminController = require('../Controllers/Admin/LoadController');
const authGuard = require('../Guards/Auth');
const adminGuard = require('../Guards/Admin');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

router
  .route('/ssh504')
  .post(
    catchAsync(authGuard.protect),
    catchAsync(adminGuard.isAdmin),
    adminGuard.isSuper,
    catchAsync(adminController.create)
  );

router
  .route('/ssh504/fetchOne/:id')
  .get(
    catchAsync(authGuard.protect),
    catchAsync(adminGuard.isAdmin),
    catchAsync(adminController.getOne)
  );

router
  .route('/ssh504/fetchMe')
  .get(
    catchAsync(authGuard.protect),
    catchAsync(adminGuard.isAdmin),
    catchAsync(adminController.getMe)
  );

module.exports = router;
