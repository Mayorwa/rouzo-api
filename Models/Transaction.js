const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  investor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investor',
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
  },
  introducer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Introducer',
  },
  amount: {
    type: Number,
    required: [true, 'Transaction amount is needed!'],
  },
  type: {
    type: String,
    enum: ['credit', 'debit'],
    default: 'credit',
  },
  location: {
    type: String,
    enum: ['stash', 'investment', 'funding', 'saving'],
    default: 'stash',
  },
  message: {
    type: String,
    required: [true, 'Transaction message is needed!'],
  },
  status: {
    type: String,
    enum: ['failed', 'success'],
    default: 'success',
  },
  reference: {
    type: String,
    unique: true,
    required: [true, 'Transaction reference is needed!'],
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

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
