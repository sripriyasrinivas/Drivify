//Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Home.css';
const HomePage = () => {
    const navigate = useNavigate(); // Initialize the navigate hook

    const handleApplyClick = () => {
        navigate('/instructions'); // Navigate to the instructions page
    };
    const handlePrintClick=()=>{
        navigate('/print');// Navigate to printll page
    };
    const handleQuizClick=()=>
    {
        navigate('/quiz');
    };
    const handleApplyDLClick=()=>
    {
        navigate('/ApplicationDL');
    };
    const handleBookDLClick=()=>
    {
        navigate('/bookdl');
    };
    const handlePrintDLClick=()=>
    {
        navigate('/printdl')
    };
    return (
        <div>
            <div className='head'>
                <header>
                    <figure>
                        <img src="/dl.svg" alt="dl" style={{ marginLeft: '0px', width: "100px", height: "100px", fill: 'white' }} />
                        <figcaption style={{marginLeft:'12px',marginUp:'0px'}}><b><i>Drivify</i></b></figcaption>
                        <h1 style={{ color: 'white', textAlign: 'center' }}>Home</h1>
                    </figure>
                </header>
            </div>
            <main>
                <main>
                    <h1 style={{marginLeft:'500px'}}>Welcome to Drivify!</h1>
                    <p style={{marginLeft:'380px',fontSize:'25px'}}>Your one-stop solution for managing driving licences.</p>
                    <div style={{alignItems:'center'}} className="steps">
                        <label style={{fontSize:'25px'}}>Learner's Licence: </label><br/>
                        <div className='stepbox' onClick={handleApplyClick}><img src='/form.png'  alt="Form logo" style={{height:120,width:120}}></img><p style={{fontSize:'25px'}}>Apply</p>{/* Navigate on click */}</div>
                        <div className='stepbox' onClick={handlePrintClick}><img src='/print.png'  alt="Print logo" style={{height:120,width:120}}></img><p style={{fontSize:'25px'}}>Print Forms</p></div>
                        <div className='stepbox' onClick={handleQuizClick}><img src='/test_home.png'  alt="Test logo" style={{height:120,width:120}}></img><p style={{fontSize:'25px'}}>Take Test</p></div>
                    </div>
                    <div style={{alignItems:'center'}} className="steps">
                        <label style={{fontSize:'25px'}}>Driving Licence: </label><br/>
                        <div className='stepbox'onClick={handleApplyDLClick}><img src='/form.png'  alt="Form logo" style={{height:120,width:120}}></img><p style={{fontSize:'25px'}}>Apply</p>{/* Navigate on click */}</div>
                        <div className='stepbox' onClick={handleBookDLClick}><img src='/calendar.png'  alt="Calendar logo" style={{height:120,width:120}}></img><p style={{fontSize:'25px'}}>Book Appointment</p><br/></div> {/* Navigate on click */}
                        <div className='stepbox' onClick={handlePrintDLClick}><img src='/print.png'  alt="Print logo" style={{height:120,width:120}}></img><p style={{fontSize:'25px'}}>Print Forms</p></div>
                    </div>
                    <section>
                        <marquee className="faq" style={{fontSize:'25px'}}><b>Frequently Asked Questions:</b> What documents do I need to apply?     <b>User Testimonials:</b> "Drivify made the application process so easy!"</marquee>
                    </section>
        
                </main>
            </main>
        </div>
    );
};

export default HomePage;
