import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './redux/hooks';
import { socketConnect } from './redux/constants/actionCreators/socketActions';

import LoginSignup from './views/LoginSignup';
import Home from './views/Home';
import Lobby from './views/Lobby';
import Split from './views/Split';
import { selectAppView } from './redux/features/viewSlice';

function App() {
  const dispatch = useAppDispatch();
  const view = useAppSelector(selectAppView);

  const views: { [key: string]: JSX.Element } = {
    login: <LoginSignup />,
    home: <Home />,
    lobby: <Lobby />,
    split: <Split />,
  };
  console.log(views);

  useEffect(() => {
    dispatch(socketConnect());
  }, []);

  return (
    <section className="app">
      {views[view]}
    </section>

  );
}

export default App;
