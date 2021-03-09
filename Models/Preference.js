const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a Description'],
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

const Preference = mongoose.model('Preference', preferenceSchema);

module.exports = Preference;
