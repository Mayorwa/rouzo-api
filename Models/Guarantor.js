const mongoose = require('mongoose');
const validator = require('validator');

const guarantorSchema = new mongoose.Schema({
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
  },
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone Number'],
  },
  relationship: {
    type: String,
    required: [true, 'Please provide your relationship with this guarantor'],
  },
  bvn: {
    type: Number,
    required: [true, 'Please provide the guarantors bank verification number'],
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

const Guarantor = mongoose.model('Guarantor', guarantorSchema);

module.exports = Guarantor;
