const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A portfolio name is required!'],
  },
  description: {
    type: String,
    required: [true, 'A portfolio description is required!'],
  },
  returnInPer: {
    type: Number,
    required: [true, 'A portfolio returns is required!'],
  },
  trustee: {
    type: String,
    required: [true, 'A portfolio trustee is required!'],
  },
  riskLevel: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low',
  },
  size: {
    type: Number,
    required: [true, 'A portfolio size is required!'],
  },
  sizeRemaining: {
    type: Number,
    required: [true, 'A portfolio size is required!'],
  },
  unique_code: {
    type: String,
    unique: true,
    required: [true, 'A portfolio unique code is required!'],
  },
  amountPerUnit: {
    type: Number,
    required: [true, 'A portfolio unit price is required!'],
  },
  managementFee: {
    type: Number,
    required: [true, 'A portfolio management fee is required!'],
  },
  isOpen: {
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

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;
