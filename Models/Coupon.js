const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'A Coupon code is required'],
    unique: true,
  },
  amount: {
    type: Number,
    default: 0.0,
    required: [true, 'A Coupon requires an amount'],
  },
  action: {
    type: String,
    enum: ['signUp'],
    default: 'signUp',
  },
  expiry_date: {
    type: Date,
    required: [true, 'A Coupon expiry date is required'],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
