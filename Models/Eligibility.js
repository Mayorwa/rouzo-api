const mongoose = require('mongoose');

const eligibilitySchema = new mongoose.Schema({
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
  },
  registration_status: {
    type: String,
    required: [true, 'Business registration status required!'],
  },
  years_of_running: {
    type: String,
    required: [true, 'Business years of running required!'],
  },
  last_business_revenue: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'Yes',
    required: [true, 'Business last revenue required!'],
  },
  account_verifiable: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'Yes',
    required: [true, 'Business last revenue required!'],
  },
  score: {
    type: Number,
    required: [true, 'Eligibility Score required!'],
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

const Eligibility = mongoose.model('Eligibility', eligibilitySchema);

module.exports = Eligibility;
