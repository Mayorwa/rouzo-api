const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  investor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investor',
  },
  portfolio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio',
  },
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
  },
  payment_method: {
    type: String,
    enum: ['stash', 'bank'],
    default: 'bank',
  },
  units_bought: {
    type: Number,
    required: [true, 'the units bought is required!'],
  },
  amount: {
    type: Number,
    required: [true, 'A investment amount is required!'],
  },
  roi: {
    type: Number,
    required: [true, 'A investment amount is required!'],
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
  period: {
    type: Number,
    required: [true, 'An Investment needs a period'],
  },
  date_purchased: Date,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Investment = mongoose.model('Investment', investmentSchema);

module.exports = Investment;
