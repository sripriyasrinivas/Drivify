// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './form_styles.css';
// import './header_col.css';

// function Form()
// {
//    return(
//     <div className='formstyle'>
//         <form>
//             <label>Application Number</label>
//             <input type="text" name="appno" required />
//             <label>Select Date</label>
//             <input type="datetime-local" name="date" required />
//             <label>Track</label>
//             <input type="text" name="appno" required />
//         </form>
//     </div>
//    );
// }
   

// function BookAppointment()
// {
//     return (
//         <div>
//             <div className='head'>
//                 <header>
//                     <figure>
//                         <img src="/dl.svg" alt="dl" style={{ marginLeft: '0px', width: "100px", height: "100px", fill: 'white' }} />
//                         <figcaption style={{ marginLeft: '12px', marginTop: '0px', color:'white' }}><b><i>Drivify</i></b></figcaption>
//                         <h1 style={{ color: 'white', textAlign: 'center' }}>Book Appointment</h1>
//                     </figure>
//                 </header>
//             </div>
//             <div>
//                 <Form />
//             </div>
//         </div>
//     )
// }

// export default BookAppointment;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './form_styles.css';
import './header_col.css';

const BookAppointment = () => {
    const navigate = useNavigate();
    
    const [applicationNumber, setApplicationNumber] = useState(''); // Input for application number
    const [tracks] = useState(["Track A", "Track B", "Track C"]); // Available tracks
    const [selectedTrack, setSelectedTrack] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!appointmentDate || !selectedTrack || !applicationNumber) {
            setError("Please enter application number, select a date, and track.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/record/appointment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    applicationNumber,
                    appointmentDate,
                    testTrack: selectedTrack,
                }),
            });

            if (response.ok) {
                setSuccessMessage("Appointment booked successfully!");
                setError(null);
                setTimeout(() => navigate("/confirmDL", { state: { message: applicationNumber } }), 3000); // Redirect after success
            } else {
                const data = await response.json();
                setError(data.error || "Error booking appointment.");
            }
        } catch (err) {
            console.error(err);
            setError("Error booking appointment.");
        }
    };

    return (
        <div>
            <div className="head">
                <header>
                    <div>
                        <img src="/dl.svg" alt="dl" style={{ marginLeft: '0px', width: "100px", height: "100px", fill: 'white' }} />
                        <figcaption style={{ marginLeft: '12px', marginTop: '0px', color: 'white' }}><b><i>Drivify</i></b></figcaption>
                        <h1 style={{ color: 'white', textAlign: 'center' }}>Book Your Appointment</h1>
                    </div>
                </header>
            </div>

            <form onSubmit={handleSubmit} style={{width: "30%", margin: "5% 20% 5% 30%"}} className='formstyle'>
                    <label>Application Number:</label>
                    <input type="text" value={applicationNumber} onChange={(e) => setApplicationNumber(e.target.value)} required />
                
                    <label>Select Date:</label>
                        <input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
                    
                    <label>Select Track:</label>
                        <select value={selectedTrack} onChange={(e) => setSelectedTrack(e.target.value)} required>
                            <option value="" disabled>Select a track</option>
                            {tracks.map((track, index) => (
                                <option key={index} value={track}>
                                    {track}
                                </option>
                            ))}
                        </select>
                    
                <button type="submit">Book Appointment</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
};

export default BookAppointment;