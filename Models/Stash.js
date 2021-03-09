const mongoose = require('mongoose');

const stashSchema = new mongoose.Schema({
  investor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investor',
  },
  introducer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Introducer',
  },
  paystack: {
    customerId: String,
    recipientId: String,
  },
  total_balance: {
    type: Number,
    default: 0.0,
    required: [true, 'A User needs a balance'],
  },
  available_balance: {
    type: Number,
    default: 0.0,
    required: [true, 'A User needs a balance'],
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

const Stash = mongoose.model('Stash', stashSchema);

module.exports = Stash;
