import React, { useState } from 'react';

import '../styles/components/joinpartydetails.css';
import { userLogin, userRegister } from '../redux/constants/actionCreators/userActions';
import { useAppDispatch } from '../redux/hooks';

function LoginSignup() {
  const dispatch = useAppDispatch();

  const [view, setView] = useState('login');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const views: { [key: string]: JSX.Element } = {
    login: (
      <div id="component">
        <div id="form">
          <h1>Login!</h1>
          <input placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input placeholder="Enter Password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div id="buttonwrapper">
          <button type="submit" id="next" onClick={() => dispatch(userLogin(username, password))}>Log In</button>
          <button type="submit" id="next" onClick={() => setView('signup')}>Register</button>
        </div>
        
      </div>
    ),
    signup: (
      <div id="component">
        <div id="form">
          <h1>Login!</h1>
          <input placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input placeholder="Enter Password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
          <input placeholder="Enter Password" value={confirm} type="password" onChange={(e) => setConfirm(e.target.value)} />
        </div>
        <button type="submit" id="next" onClick={() => dispatch(userRegister(username, password))}>Sign Up</button>
        <button type="submit" id="next" onClick={() => setView('login')}>Log In</button>
      </div>
    ),
  };

  return (
    <div>
      {views[view]}
    </div>
  );
}

export default LoginSignup;
