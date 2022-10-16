/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { partyCreate, partyJoin } from '../../redux/constants/actionCreators/partyActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import '../../styles/components/joinpartydetails.css';

type Props = {
  setView: (view: string) => void;
};
function JoinParty({ setView }: Props) {
  const dispatch = useAppDispatch();

  const self = useAppSelector((state) => state.self);

  const [code, setCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <div>
      <div id="component">
        <div id="form">
          <h1>Join Party!</h1>
          <input placeholder="Enter Party Name" value={code} onChange={(e) => setCode(e.target.value)} />
          <input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <button type="submit" id="next" onClick={() => dispatch(partyCreate(`${firstName} ${lastName}`, self.id))}>Next</button>
      </div>
    </div>
  );
}

export default JoinParty;
