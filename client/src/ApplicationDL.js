import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import Tesseract from 'tesseract.js';
import './form_styles.css';
import './header_col.css';

const Form = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        dob: '',
        address: '',
        aadhaarfile: null,
        aadhaar: '',
        city: '',
        pincode: '',
        email: '',
        phno: '',
        learnersLicense: '',
        bloodGroup: 'O',
        nationality: 'Indian',
        vehicleType: 'twoWheeler',
    });

    const [errors, setErrors] = useState({});
    const [extractedText, setExtractedText] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
        extractText(files[0]);
    };

    //validate the form details
    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName) newErrors.fullName = "Full Name is required";
        if (!validator.isDate(formData.dob)) newErrors.dob = "Invalid date of birth";
        if (!formData.address) newErrors.address = "Address is required";
        if (!validator.isLength(formData.aadhaar, { min: 12, max: 12 })) newErrors.aadhaar = "Aadhaar must be 12 digits";
        if (!validator.isLength(formData.pincode, { min: 6, max: 6 })) newErrors.pincode = "Pincode must be 6 digits";
        if (!validator.isEmail(formData.email)) newErrors.email = "Invalid email address";
        if (!validator.isLength(formData.phno, { min: 10, max: 10 })) newErrors.phno = "Phone number must be 10 digits";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Function to extract text using Tesseract
    const extractText = (file) => {
        if (!file) return;

        Tesseract.recognize(
            file,
            'eng',
            {
                logger: (m) => console.log(m),
            }
        ).then(({ data: { text } }) => {
            setExtractedText(text);  
            extractAadhaarNumber(text);  
        });
    };

    // Function to extract Aadhaar number using regex
    const extractAadhaarNumber = (text) => {
        const aadhaarPattern = /\b\d{4}\s\d{4}\s\d{4}\b/;
        const match = text.match(aadhaarPattern);
        if (match) {
            setFormData({ ...formData, aadhaar: match[0].replace(/\s/g, '') }); // Set extracted Aadhaar number
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const formDataToSend = new FormData();

            Object.keys(formData).forEach((key) => {
                if (key !== "aadhaarfile") {
                    formDataToSend.append(key, formData[key]);
                }
            });

            if (formData.aadhaarfile) {
                formDataToSend.append("aadhaarfile", formData.aadhaarfile);
            }

            const response = await fetch('http://localhost:5000/record', {
                method: 'POST',
                body: formDataToSend,
            });

            if (response.ok) {
                alert("Application submitted successfully");
                const data = await response.json(); 
                const message = data.message; 
                console.log(message); 
                navigate('/ConfirmDL', { state: { message } }); 
            } else {
                alert("Failed to submit application");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className='formstyle'>
            <form onSubmit={handleSubmit}>
                <label>Full Name:</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
                {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName}</p>}
                <br /><br />

                <label>Date of Birth:</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />
                {errors.dob && <p style={{ color: 'red' }}>{errors.dob}</p>}
                <br /><br />

                <label>Address:</label>
                <textarea name="address" rows="2" cols="30" value={formData.address} onChange={handleInputChange} required></textarea>
                {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
                <br /><br />

                <label>Aadhaar Card Upload:</label>
                <input type="file" name="aadhaarfile" onChange={handleFileChange} required />
                {formData.aadhaarfile && <p>Selected file: {formData.aadhaarfile.name}</p>}
                <br /><br />

                <label>Aadhaar No.:</label>
                <input
                    type="text"
                    name="aadhaar"
                    value={formData.aadhaar}
                    onChange={handleInputChange}
                    pattern="[0-9]{12}"
                    placeholder="12 digits"
                    required
                />
                {errors.aadhaar && <p style={{ color: 'red' }}>{errors.aadhaar}</p>}
                <br /><br />

                <label>Learner's License Number:</label>
                <input
                    type="text"
                    name="learnersLicense"
                    value={formData.learnersLicense}
                    onChange={handleInputChange}
                    required
                />
                {errors.aadhaar && <p style={{ color: 'red' }}>{errors.aadhaar}</p>}
                <br /><br />

                <label>City:</label>
                <input type="text" name="city" value={formData.city} onChange={handleInputChange} required />
                {errors.city && <p style={{ color: 'red' }}>{errors.city}</p>}
                <br /><br />

                <label>Pincode:</label>
                <input type="text" name="pincode" pattern="[0-9]{6}" placeholder="6 digits" value={formData.pincode} onChange={handleInputChange} required />
                {errors.pincode && <p style={{ color: 'red' }}>{errors.pincode}</p>}
                <br /><br />

                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                <br /><br />

                <label>Phone No.:</label>
                <input type="text" name="phno" pattern="[0-9]{10}" placeholder="10 digits" value={formData.phno} onChange={handleInputChange} required />
                {errors.phno && <p style={{ color: 'red' }}>{errors.phno}</p>}
                <br /><br />

                <label>Blood Group:</label>
                <select name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange}>
                    <option value="O">O</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="AB">AB</option>
                </select>
                {errors.bloodGroup && <p style={{ color: 'red' }}>{errors.bloodGroup}</p>}
                <br /><br />

                <label>Nationality:</label>
                <select name="nationality" value={formData.nationality} onChange={handleInputChange}>
                    <option value="Indian">Indian</option>
                    <option value="British">British</option>
                    <option value="American">American</option>
                    <option value="Canadian">Canadian</option>
                    <option value="Russian">Russian</option>
                    <option value="French">French</option>
                </select>
                {errors.nationality && <p style={{ color: 'red' }}>{errors.nationality}</p>}
                <br /><br />

                <label>Vehicle Type:</label>
                <select name="vehicleType" value={formData.vehicleType} onChange={handleInputChange}>
                    <option value="twoWheeler">Two-Wheeler</option>
                    <option value="car">Car</option>
                    <option value="truck">Truck</option>
                </select>
                {errors.vehicleType && <p style={{ color: 'red' }}>{errors.vehicleType}</p>}
                <br /><br />

                <button type="submit">Submit Application</button>
            </form>
        </div>
    );
};

const ApplicationDL = () => {
    return (
        <div>
            <div className='head'>
                <header>
                    <div>
                        <img src="/dl.svg" alt="dl" style={{ marginLeft: '0px', width: "100px", height: "100px", fill: 'white' }} />
                        <figcaption style={{ marginLeft: '12px', marginTop: '0px', color: 'white' }}><b><i>Drivify</i></b></figcaption>
                        <h1 style={{ color: 'white', textAlign: 'center' }}>Application Form For DL</h1>
                    </div>
                </header>
            </div>
            <div>
                <Form />
            </div>
        </div>
    );
};


export default ApplicationDL;