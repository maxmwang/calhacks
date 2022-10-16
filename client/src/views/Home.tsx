import React from 'react';
import { appViewSet } from '../redux/constants/actionCreators/socketActions';
import { useAppDispatch } from '../redux/hooks';

import '../styles/split.css';

function Home() {
  const dispatch = useAppDispatch();
  return (
    <div>
      history goes here
      <button type="button" onClick={() => dispatch(appViewSet('split'))}>Split</button>
    </div>
  );
}

export default Home;
