//Payment.js
import React from "react";
import './form_styles.css';
import './header_col.css';

const Payment=()=>
{
    return(
        <div>
            <div className='head'>
                <header>
                    <figure>
                        <img src="/dl.svg" alt="dl" style={{marginLeft:'0px',width:"100px",height:"100px",fill:'white'}}/>
                        <figcaption style={{marginLeft:'12px',marginUp:'0px'}}><b><i>Drivify</i></b></figcaption>
                        <h1 style={{color:'white',textAlign:'center'}}>Payment</h1>
                    </figure>
                </header>
            </div>
            <br/>
            <div className='formstyle'><br/>
                <h3 style={{fontSize:20}}>Pay by :</h3><br/>
                <ul style={{textAlign:'left',paddingLeft: '20px', listStylePosition: 'inside'}}>
                    <li style={{fontSize:20}}>G Pay</li><br/>
                    <li style={{fontSize:20}}>PhonePe</li><br/>
                    <li style={{fontSize:20}}>Net Banking</li><br/>
                    <li style={{fontSize:20}}>Credit/Debit Card</li><br/>
                </ul>
            </div>
        </div>
    )
}
export default Payment;

    