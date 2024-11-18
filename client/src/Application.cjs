// Application.js
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    dob: { type: Date, required: true },
    address: { type: String, required: true },
    aadhar: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    email: { type: String, required: true },
    phno: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    nationality: { type: String, required: true },
    vehicleType: { type: String, required: true },
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
