const mongoose = require('mongoose');

const savingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  investor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investor',
  },
  paystack: {
    plan_code: String,
    subscription_code: String,
    email_token: String,
  },
  name: {
    type: String,
    required: [true, 'A Savings plan name is required'],
  },
  amount: {
    type: Number,
    required: [true, 'A Savings plan needs an amount'],
  },
  interval: {
    period: {
      type: String,
      enum: ['monthly', 'weekly', 'daily'],
      default: 'monthly',
    },
    periodLength: {
      type: Number,
      required: [true, 'A Savings Plan needs amount of months'],
    },
    periodPaid: {
      type: Number,
      default: 1,
    },
  },
  projectedReturn: {
    type: Number,
    required: [true, 'A projected Savings Return is required'],
  },
  nextPayment: {
    type: Date,
  },
  active: {
    type: Boolean,
    default: true,
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

const Saving = mongoose.model('Saving', savingSchema);

module.exports = Saving;
