const express = require('express');
const router = express.Router(); // Initialize the router
const Test = require('./testmodel.js'); // Import your Mongoose model if needed

// Route to handle test submissions
router.post('/submit', async (req, res) => {
  try {
    const { applicationId, answers } = req.body;

    if (!applicationId || !answers) {
      return res.status(400).json({ message: 'Application ID and answers are required' });
    }

    // Save the test data to the database (if using MongoDB)
    const testSubmission = new Test({
      applicationId,
      answers,
    });

    await testSubmission.save();
    res.status(200).json({ message: 'Test submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while submitting the test' });
  }
});

module.exports = router; // Export the router