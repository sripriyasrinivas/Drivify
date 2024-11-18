const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  applicationId: { type: String, required: true },
  answers: { type: Array, required: true },
});

module.exports = mongoose.model('Submission', SubmissionSchema);