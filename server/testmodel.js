const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  applicationId: {
    type: String,
    required: true,
  },
  answers: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;