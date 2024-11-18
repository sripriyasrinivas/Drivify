import React, { useState } from "react";
import { getApplication } from "./api"; // Assuming getApplication is defined in api.js
import './header_col.css';
import './form_styles.css';
const Print = () => {

  const [formData, setFormData] = useState({
    fullName: "",
  });
  const [application, setApplication] = useState(null); // State to store application details
  const [error, setError] = useState(null); // State to store any errors

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Destructure to get the fullName
    const { fullName } = formData;

    // Validation
    if (!fullName) {
      alert("Please fill full name before submitting the form.");
      return;
    }

    try {
      // Fetch application data by full name (assuming `getApplication` accepts full name or application ID)
      const applicationData = await getApplication(fullName);

      if (applicationData) {
        setApplication(applicationData); // Set application data to display on the page
        setError(null);
      } else {
        setApplication(null);
        setError("No application found for the given name.");
      }
    } catch (error) {
      console.error("Error fetching application:", error);
      setError("Failed to retrieve application. Please try again.");
    }

    // Reset the form data
    setFormData({
      fullName: "",
    });
  };

  return (
    <div>
      <div className='head'>
        <header>
          <figure>
            <img
              src="/dl.svg"
              alt="dl"
              style={{ marginLeft: "0px", width: "100px", height: "100px" }}
            />
            <figcaption style={{ marginLeft: "12px", marginTop: "0px" }}>
              <b><i>Drivify</i></b>
            </figcaption>
            <h1 style={{ color: "white", textAlign: "center" }}>
              Print Application Form
            </h1>
          </figure>
        </header>
      </div>
      <br />
      <div ><br/>
        <form onSubmit={handleSubmit} className="formstyle">
          <label style={{fontSize:"25px",marginLeft:"10px"}}>Full Name: </label>
          <input style={{fontSize:"25px"}}
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
          <br /><br/>
          <button style={{fontSize:20}}type="submit">Submit</button>
        </form>
      </div>
      <br />

      {/* Display application details if available */}
      {application && (
        <div style={{ border: "1px solid #ddd", padding: "20px", marginTop: "20px" ,marginLeft:"450px", width:"400px"}}>
          <h2>Application Details</h2>
          <p><strong>ID:</strong> {application._id}</p>
          <p><strong>Name:</strong> {application.fullName}</p>
          <p><strong>Date of Birth:</strong> {application.dob}</p>
          <p><strong>Address:</strong> {application.address}</p>
          <p><strong>Aadhar:</strong> {application.aadhar}</p>
          <p><strong>City:</strong> {application.city}</p>
          <p><strong>Pincode:</strong> {application.pincode}</p>
          <p><strong>Email:</strong> {application.email}</p>
          <p><strong>Phone Number:</strong> {application.phno}</p>
          <p><strong>Blood Group:</strong> {application.bloodGroup}</p>
          <p><strong>Aadhar:</strong> {application.aadhar}</p>
          <p><strong>Nationality:</strong> {application.nationality}</p>
          <p><strong>Vehicle Type:</strong> {application.vehicleType}</p>
        </div>
      )}

      {/* Display error message if no application found or error occurs */}
      {error && <p style={{ color: "red" ,marginLeft: "450px",fontSize:"25px"}}>{error}</p>}
    </div>
  );
};

export default Print;