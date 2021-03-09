const express = require('express');

const router = express.Router();
const authController = require('../Controllers/Auth/LoadController');
const catchAsync = require('../utils/catchAsync');
const authGuard = require('../Guards/Auth');

router
  .route('/signUp')
  .post(authGuard.guest, catchAsync(authController.signUp));
router.route('/login').post(authGuard.guest, catchAsync(authController.login));
router.route('/logout').get(authController.logout);
router.route('/verify/:token').get(catchAsync(authController.verify));
router.route('/forgotPassword').post(catchAsync(authController.forgotPassword));
router
  .route('/resetPassword/:token')
  .patch(catchAsync(authController.resetPassword));
//For Admin Creation
router
  .route('/getUser')
  .get(
    catchAsync(authGuard.protect),
    authController.getMe,
    catchAsync(authController.getUser)
  );

module.exports = router;
