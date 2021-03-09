const express = require('express');
const multer = require('multer');
const documentController = require('../Controllers/Document/LoadController');
const catchAsync = require('../utils/catchAsync');
const authGuard = require('../Guards/Auth');

const upload = multer();
const router = express.Router();

router
  .route('/createBus')
  .post(
    authGuard.protect,
    catchAsync(authGuard.isBusiness),
    upload.single('doc'),
    catchAsync(documentController.uploadDocumentBus)
  );

module.exports = router;
