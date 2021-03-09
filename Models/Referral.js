const mongoose = require('mongoose');
const validator = require('validator');

const referralSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['investor', 'introducer'],
    default: 'investor',
  },
  investor: {
    referer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    hasPayed: {
      type: Boolean,
      default: false,
    },
    amount: {
      type: Number,
      default: 0.0,
    },
  },
  introducer: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    business_name: String,
    email: {
      type: String,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  hasSignUp: {
    type: Boolean,
    default: false,
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

const Referral = mongoose.model('Referral', referralSchema);

module.exports = Referral;
