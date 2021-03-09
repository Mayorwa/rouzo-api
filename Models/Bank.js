const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A bank name is required'],
  },
  code: {
    type: String,
    required: [true, 'Please provide the banks code'],
    unique: true,
  },
  long_code: {
    type: String,
    required: [true, 'Please provide the banks longCode'],
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

const Bank = mongoose.model('Bank', bankSchema);

module.exports = Bank;
