const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  investor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investor',
  },
  introducer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Introducer',
  },
  amount: {
    type: String,
    required: [true, 'Please provide a transfer amount'],
  },
  message: {
    type: String,
    required: [true, 'Please provide a transfer message'],
  },
  transfer_code: {
    type: String,
    required: [true, 'Please provide a transfer code'],
  },
  reference: String,
  otpConfirmed: {
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

const Transfer = mongoose.model('Transfer', transferSchema);

module.exports = Transfer;
