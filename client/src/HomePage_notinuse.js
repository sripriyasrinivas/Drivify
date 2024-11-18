import React, { useState } from 'react';

const HomePage = () => {
    const [selectedState, setSelectedState] = useState('Select State');
    const states = ['Karnataka', 'Maharashtra', 'Tamil Nadu', 'Kerala', 'Other']; 

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
    };

    return (
        <div>
            <header style={styles.header}>
                <div style={styles.logo}>
                    <img src="/dl.svg" alt="Drivify Logo" style={styles.logoImage} />
                    <h1>Drivify</h1>
                </div>
                <nav style={styles.nav}>
                    <a href="#">About</a>
                    <a href="#">Feedback</a>
                    <a href="#">Contact</a>
                </nav>
            </header>

            <main style={styles.main}>
                <section style={styles.banner}>
                    <h2>Get Your Driving License</h2>
                    <div style={styles.dropdownContainer}>
                        <select style={styles.dropdown} value={selectedState} onChange={handleStateChange}>
                            <option value="Select State" disabled>Select State</option>
                            {states.map((state, index) => (
                                <option key={index} value={state}>{state}</option>
                            ))}
                        </select>
                    </div>
                </section>
                <section style={styles.content}>
                    <h3>Content...</h3>
                </section>
            </main>
        </div>
    );
};


const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    logo: {
        display: 'flex',
        alignItems: 'center'
    },
    logoImage: {
        height: '40px',
        marginRight: '10px'
    },
    nav: {
        display: 'flex',
        gap: '20px'
    },
    banner: {
        backgroundImage: 'url("/DLHome2.png")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center',
        padding: '100px 20px',
        color: '#fff'
    },
    dropdownContainer: {
        marginTop: '20px'
    },
    dropdown: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px'
    },
    main: {
        backgroundColor: '#f9f9f9'
    },
    content: {
        padding: '50px 20px',
        textAlign: 'center'
    }
};

export default HomePage;
