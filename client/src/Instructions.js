//Instructions.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './header_col.css';
import './form_styles.css';

const Instructions = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook for redirection

    const handleOkClick = () => {
        navigate('/apply'); // Redirects to the application form page
    };

    return (
        <div>
            <div className='head'>
                <header>
                    <figure>
                        <img src="/dl.svg" alt="dl" style={{ marginLeft: '0px', width: "100px", height: "100px", fill: 'white' }} />
                        <figcaption style={{marginLeft:'12px',marginUp:'0px'}}><b><i>Drivify</i></b></figcaption>
                        <h1 style={{ color: 'white', textAlign: 'center' }}>Application for Learner's Licence</h1>
                    </figure>
                </header>
            </div>
            <br/>
            <div className='formstyle'>
                <br/>
                <h2>Instructions</h2><br/>
                <ol style={{textAlign:'left',paddingLeft: '20px', listStylePosition: 'inside'}}>
                    <li style={{fontSize:'20px'}}>Fill the application details</li><br/>
                    <li style={{fontSize:'20px'}}>Fee payment</li><br/>
                    <li style={{fontSize:'20px'}}>Verify the payment status</li><br/>
                    <li style={{fontSize:'20px'}}>Print the application</li><br/>
                </ol>
                <button onClick={handleOkClick} style={{ padding: '10px 20px', marginTop: '20px', fontSize: '16px' }}>
                    OK
                </button>
            </div>
        </div>
    );
};

export default Instructions;