const express = require("express");

// This will help us connect to the database
const db = require("../db/conn.js");

// This helps convert the id from string to ObjectId for the _id.
const { ObjectId } = require("mongodb");

// For file upload
const multer = require("multer");
const path = require("path");

// Router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// Use timestamp (13-digit) for application number
const applicationNumber = Date.now().toString();

// Set up multer storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, applicationNumber + path.extname(file.originalname));  // path.extname(file.originalname) for .png
  }
});

const upload = multer({ storage });

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("records");
  let results = await collection.find({}).toArray();
  res.status(200).send(results);
});

// This section will help you get a single record by id
router.get("/application/:applicationNumber", async (req, res) => {
  try {
    let collection = await db.collection("records");
    const query = { applicationNumber: req.params.applicationNumber };
    const result = await collection.findOne(query);

    if (!result) return res.status(404).send({ error: "Application not found" });
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching application details");
  }
});

// This section will help you create a new record.
router.post("/", upload.single("aadhaarfile"), async (req, res) => {
  try {
    // Collecting form data along with the uploaded file path
    const newDocument = {
      applicationNumber,
      fullName: req.body.fullName,
      dob: req.body.dob,
      address: req.body.address,
      aadhaarfile: req.file ? req.file.path : null, // Save file path in DB
      aadhaar: req.body.aadhaar,
      learnersLicense: req.body.learnersLicense,
      city: req.body.city,
      pincode: req.body.pincode,
      email: req.body.email,
      phno: req.body.phno,
      bloodGroup: req.body.bloodGroup,
      nationality: req.body.nationality,
      vehicleType: req.body.vehicleType,
    };

    let collection = await db.collection("records");
    let result = await collection.insertOne(newDocument);
    res.status(200).send({ message: applicationNumber });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };

    let collection = await db.collection("records");
    let result = await collection.updateOne(query, updates);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("records");
    let result = await collection.deleteOne(query);

    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

// POST Route to book an appointment
router.post("/appointment", async (req, res) => {
  try {
    const { applicationNumber, appointmentDate, testTrack } = req.body;

    if (!applicationNumber || !appointmentDate || !testTrack) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    const collection = await db.collection("records");
    const result = await collection.updateOne(
      { applicationNumber },
      { $set: { appointmentDate, testTrack } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ error: "Application not found" });
    }

    res.status(200).send({ message: "Appointment booked successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error booking appointment");
  }
});

// Correct export of the router
module.exports = router;
