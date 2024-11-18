const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const testRoutes = require('./testRoutes.js'); // Import your router
const records =require('./routes/record.js');
const app = express();
const PORT = 5000;
const MongoClient = mongodb.MongoClient;

app.use(cors());
app.use(bodyParser.json());

const url = 'mongodb://localhost:27017'; // MongoDB URL
const dbName = 'drivingLicenceDB'; // Database name
let db;

// Connect to MongoDB
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database');
        db = client.db(dbName);
    })
    .catch(error => console.error('Connection Error:', error));

// API to save application data
app.post('/api/save-application', async (req, res) => {
    try {
        const applicationData = req.body;
        console.log('Hooray! ');
        console.log(applicationData);
        const result = await db.collection('applications').insertOne(applicationData); // Collection created if it doesn't exist
        res.status(201).json({ message: 'Application saved', id: result.insertedId });
    } catch (error) {
        console.error('Error inserting application:', error);
        res.status(500).json({ error: 'Failed to save application' });
    }
});

app.get('/api/get-application', async(req, res) => {
    try {
        console.log('Hooray Get! ');
        const name = req.query.applicationId;
        console.log(name);
        const result = await db.collection('applications').findOne({fullName:name}); // Collection created if it doesn't exist
        console.log(result);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error finding application:', error);
        res.status(500).json({ error: 'Failed to find application' });
    }

});
app.use('/api/tests', testRoutes);

// MongoDB connection
mongoose
  .connect('mongodb://127.0.0.1:27017/mern_test_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.use(express.json());
app.use("/record", records);
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
