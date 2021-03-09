const mongoose = require('mongoose');

const fundSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
  },
  description: {
    type: String,
    required: [true, 'Please provide the fund description'],
  },
  category: {
    type: String,
    enum: ['capital', 'asset'],
    default: 'capital',
  },
  resides_in_lagos: {
    type: Boolean,
    default: true,
    required: [true, 'Please indicate if you reside in Lagos, Nigeria'],
  },
  existing_loan: {
    type: Boolean,
    default: true,
    required: [true, 'Please indicate if you have any existing loan'],
  },
  certify_guarantor: {
    type: Boolean,
    default: true,
    required: [true, 'Please indicate if you provided valid guarantors'],
  },
  certify_document: {
    type: Boolean,
    default: true,
    required: [true, 'Please indicate if you provided valid document'],
  },
  progress: {
    type: String,
    enum: ['review', 'payment', 'visitation', 'approved', 'rejected'],
    default: 'review',
  },
  has_paid_reg: {
    type: Boolean,
    default: false,
  },
  is_open: {
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

const Fund = mongoose.model('Fund', fundSchema);

module.exports = Fund;
