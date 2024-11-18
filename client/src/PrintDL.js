import React, { useState} from 'react';
import './form_styles.css';
import './header_col.css';

const PrintDL = () => {
    const [applicationNumber, setApplicationNumber] = useState(''); // State to store the input application number
    const [applicationData, setApplicationData] = useState(null); // State to hold the fetched data
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setApplicationNumber(e.target.value); // Update the application number on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!applicationNumber) {
            setError('Please enter an application number.');
            return;
        }

        // Fetch application details using the application number
        try {
            const response = await fetch(`http://localhost:5000/record/application/${applicationNumber}`);
            if (response.ok) {
                const data = await response.json();
                setApplicationData(data);
                setError(null); // Clear any previous error
            } else {
                setError('Unable to fetch application details. Please check the application number and try again.');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while fetching application details.');
        }
    };

    const handlePrint = () => {
        window.print(); // Trigger print dialog
    };

    if (error) {
        return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;
    }

    if (!applicationData) {
        return (
            <div>
                <div className='head'>
                    <header>
                        <div>
                            <img src="/dl.svg" alt="dl" style={{ marginLeft: '0px', width: "100px", height: "100px", fill: 'white' }} />
                            <figcaption style={{ marginLeft: '12px', marginTop: '0px', color: 'white' }}><b><i>Drivify</i></b></figcaption>
                            <h1 style={{ color: 'white', textAlign: 'center' }}>Print Details</h1>
                        </div>
                    </header>
                </div>
                {/* Input form for application number */}
                <div className="formstyle" style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h2>Enter Application Number</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={applicationNumber}
                            onChange={handleInputChange}
                            required
                            style={{ padding: '10px', fontSize: '16px' }}
                        />
                        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', marginLeft: '10px' }}>
                            Fetch Details
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // Render the application details and print option after data is fetched
    return (
        <div>
            <div className='head'>
                <header>
                    <div>
                        <img src="/dl.svg" alt="dl" style={{ marginLeft: '0px', width: "100px", height: "100px", fill: 'white' }} />
                        <figcaption style={{ marginLeft: '12px', marginTop: '0px', color: 'white' }}><b><i>Drivify</i></b></figcaption>
                        <h1 style={{ color: 'white', textAlign: 'center' }}>Print Details</h1>
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

                {/* Check if booking is done */}
                <h3>Booking Details</h3>
                {applicationData.appointmentDate && applicationData.testTrack ? (
                    <>
                        <p><strong>Booking Date:</strong> {applicationData.appointmentDate}</p>
                        <p><strong>Track:</strong> {applicationData.testTrack}</p>
                    </>
                ) : (
                    <p><strong>Booking Status:</strong> Not booked yet</p>
                )}

                {/* Button to print the page */}
                <button onClick={handlePrint} style={{ marginTop: '20px' }}>Print Details</button>
            </div>
        </div>
    );
};

export default PrintDL;