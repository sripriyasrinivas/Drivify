import React, { useState, useRef, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import './SelectState.css'; 
import 'aos/dist/aos.css';
import Aos from 'aos';

const Steps = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} style={{paddingLeft: '50px', backgroundColor: 'rgb(243, 243, 243)'}}>
            <h1>Steps To Apply</h1>
            <div className="steps">
                <div className='stepbox'>
                    <img src="./apply.png" alt="apply" width="70" />
                    <br/>
                    <b>Apply</b>
                    <br/>
                    <p>Select your state</p>
                    <p>Fill the application form</p>
                    <p>Get your application number</p>
                </div>
                <div className='stepbox'>
                    <img src="./test.png" alt="test" width="70" />
                    <br/>
                    <b>Test</b>
                    <br/>
                    <p>Refer to our videos for the test</p>
                    <p>Login to the test</p>
                    <p>Give the test</p>
                </div>
                <div className='stepbox'>
                    <img src="./complete.png" alt="test" width="70" />
                    <br/>
                    <b>Get Your License</b>
                    <br/>
                    <p>Wait for test results</p>
                    <p>Get your Driving License!</p>
                </div>
            </div>
            
        </div>
    );
});


const About = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className="about">
            <h1>About Us</h1>
            <div>
                <div style={{display: 'flex'}} data-aos="fade-up" data-aos-delay="300">
                    <div className='objective'>
                        <img src="/1.png" alt="vision" height="50px"/>
                        <h3>Vision</h3>
                        <p>To improve the quality of service delivery to the citizen and the quality of work environment of the RTOs.</p>
                    </div>
                    <div className='objective' data-aos="fade-up" data-aos-delay="500">
                        <img src="/2.png" alt="mission" height="50px"/>
                        <h3>Mission</h3>
                        <p>To automate all Vehicle Registration and Driving License related activities in transport authorities of country with introduction of smart card technology to handle issues like inter state transport vehicle movement and to create state and national level registers of vehicles/DL information</p>
                    </div>
                    <div className='objective' data-aos="fade-up" data-aos-delay="700">
                         <img src="/3.png" alt="obj" height="50px"/>
                        <h3>Objectives</h3>
                            <p>Better services to Transport Department as well as citizen</p>
                            <p>Instant access of Vehicle/DL information to other government departments</p>
                    </div>
                    
                </div>
            </div>
        </div>
    );
});

const Contact = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className="dl">
            <h1>Contact</h1>
            <div style={{ display: 'flex', padding:'5% 2% 5% 5%' }}>
                <div data-aos="fade-right">
                    <img src="./ContactUs.jpg" alt="car" width="200" />
                </div>
                <div style={{padding:'0% 2% 0% 5%' }} data-aos="fade-left" >
                    <h2>Phone</h2>
                    <p>+91 0123456789</p>
                    <h2>Email</h2>
                    <p>abcd@xyz.com</p>
                </div>
            </div>
        </div>
    );
});

const SelectState = () => {
    const [selectedState, setSelectedState] = useState('Select State');
    const states = ['Karnataka', 'Maharashtra', 'Tamil Nadu', 'Kerala', 'Other'];
    const navigate = useNavigate();
    const aboutRef = useRef(null);
    const contactRef = useRef(null);
    const stepsRef = useRef(null);

    useEffect(() => {
        Aos.init({ duration: 600 });
    }, []);

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
        if (event.target.value !== 'Select State') {
            navigate('/home');
        }
    };

    const scrollToSteps = () => {
        if (stepsRef.current) {
            stepsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const scrollToAbout = () => {
        if (aboutRef.current) {
            aboutRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToContact = () => {
        if (contactRef.current) {
            contactRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <div className="top">
                <header className="header">
                    <div className="logo">
                        <img src="/dl.svg" alt="Drivify Logo" />
                        <h1>Drivify</h1>
                    </div>
                    <nav className="nav">
                        <button onClick={scrollToSteps} className="link">Steps to Apply</button>
                        <button onClick={scrollToAbout} className="link">About</button>
                        <button onClick={scrollToContact} className="link">Contact</button>
                    </nav>
                </header>

                <div className="main">
                    <h1 style={{ fontSize: '40px' }}>Get Your Driving License!</h1>
                    <h2>Select State</h2>
                    <div className="dropdown-container">
                        <select className="dropdown" value={selectedState} onChange={handleStateChange}>
                            <option value="Select State" disabled>Select State</option>
                            {states.map((state) => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div data-aos="fade-up">
                <Steps ref={stepsRef} />
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
                <About ref={aboutRef} />
            </div>
            <div>
                <Contact ref={contactRef} />
            </div>
        </div>
    );
};

export default SelectState;