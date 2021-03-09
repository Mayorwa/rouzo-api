const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  user_type: {
    type: String,
    enum: ['business', 'introducer'],
    default: 'business',
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
  },
  introducer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Introducer',
  },
  type: {
    type: String,
    required: [true, 'Please tell us the document type!'],
  },
  file: {
    type: String,
    required: [true, 'file url required!'],
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

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
