import React from 'react';
import '../styles/components/joinpartydetails.css';

function JoinPartyDetails() {
    
  return (
    <div id="component">
        <div id="form">
            <h1>Join Party!</h1>
            <input placeholder='Enter Party Code'></input>
            <input placeholder='First Name'></input>
            <input placeholder='Last Name'></input>
        </div>
        <button id="next">Next</button>
    </div>
  );
}

export default JoinPartyDetails;
