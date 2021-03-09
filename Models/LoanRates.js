const mongoose = require('mongoose');

const loanRatesSchema = new mongoose.Schema({
  portfolio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio',
  },
  three: {
    type: Number,
    required: [true, 'A portfolio interest is required!'],
  },
  six: {
    type: Number,
    required: [true, 'A portfolio interest is required!'],
  },
  nine: {
    type: Number,
    required: [true, 'A portfolio interest is required!'],
  },
  twelve: {
    type: Number,
    required: [true, 'A portfolio interest is required!'],
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

const LoanRates = mongoose.model('LoanRates', loanRatesSchema);

module.exports = LoanRates;
