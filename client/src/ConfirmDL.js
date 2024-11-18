import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './form_styles.css';
import './header_col.css';

const ConfirmDL = () => {
    const location = useLocation();
    const applicationNumber = location.state.message || ''; // Access application number from state
    console.log(applicationNumber);

    const [applicationData, setApplicationData] = useState(null); // State to hold the fetched data
    const [error, setError] = useState(null);

    // Fetch application details using the application number
    useEffect(() => {
        const fetchApplicationData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/record/application/${applicationNumber}`);
                if (response.ok) {
                    const data = await response.json();
                    setApplicationData(data);
                } else {
                    setError('Unable to fetch application details. Please try again later.');
                }
            } catch (err) {
                console.error(err);
                setError('An error occurred while fetching application details.');
            }
        };

        if (applicationNumber) {
            fetchApplicationData();
        }
    }, [applicationNumber]);

    if (error) {
        return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;
    }

    if (!applicationData) {
        return <div style={{ textAlign: 'center' }}>Loading application details...</div>;
    }

    // Render the application details
    return (
        <div>
            <div className='head'>
                <header>
                    <div>
                        <img src="/dl.svg" alt="dl" style={{ marginLeft: '0px', width: "100px", height: "100px", fill: 'white' }} />
                        <figcaption style={{ marginLeft: '12px', marginTop: '0px', color: 'white' }}><b><i>Drivify</i></b></figcaption>
                        <h1 style={{ color: 'white', textAlign: 'center' }}>Application Confirmed</h1>
                    </div>
                </header>
            </div>
            <div className="formstyle">
                <h2>Application Details</h2>
                <p><strong>Application Number:</strong> {applicationData.applicationNumber}</p>
                <p><strong>Full Name:</strong> {applicationData.fullName}</p>
                <p><strong>Date of Birth:</strong> {applicationData.dob}</p>
                <p><strong>Address:</strong> {applicationData.address}</p>
                <p><strong>Aadhaar Number:</strong> {applicationData.aadhaar}</p>
                <p><strong>City:</strong> {applicationData.city}</p>
                <p><strong>Pincode:</strong> {applicationData.pincode}</p>
                <p><strong>Email:</strong> {applicationData.email}</p>
                <p><strong>Phone Number:</strong> {applicationData.phno}</p>
                <p><strong>Blood Group:</strong> {applicationData.bloodGroup}</p>
                <p><strong>Nationality:</strong> {applicationData.nationality}</p>
                <p><strong>Vehicle Type:</strong> {applicationData.vehicleType}</p>
                <h3>Booking Details</h3>
                {applicationData.appointmentDate && applicationData.testTrack ? (
                    <>
                        <p><strong>Booking Date:</strong> {applicationData.appointmentDate}</p>
                        <p><strong>Track:</strong> {applicationData.testTrack}</p>
                    </>
                ) : (
                    <p><strong>Booking Status:</strong> Not booked yet</p>
                )}
            </div>
        </div>
    );
};

export default ConfirmDL;