const mongoose = require('mongoose');
const validator = require('validator');

const introducerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone Number'],
    unique: true,
  },
  address: {
    type: String,
    required: [true, 'Please provide an address'],
  },
  slug: {
    type: String,
    unique: true,
    required: [true, 'Please provide an slug'],
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

const Introducer = mongoose.model('Introducer', introducerSchema);

module.exports = Introducer;
