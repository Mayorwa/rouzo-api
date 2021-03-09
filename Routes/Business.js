const express = require('express');
const businessController = require('../Controllers/Business/LoadController');
const catchAsync = require('../utils/catchAsync');
const authGuard = require('../Guards/Auth');

const router = express.Router();

router.route('/').post(authGuard.guest, catchAsync(businessController.create));
module.exports = router;
