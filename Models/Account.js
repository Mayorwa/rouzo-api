const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: [true],
  },
  bank: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bank',
  },
  bvn: {
    type: String,
    unique: [true, 'BVN has been taken'],
  },
  account_number: {
    type: String,
    unique: [true, 'Account number has been taken'],
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

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
