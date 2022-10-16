import React, { useEffect } from 'react';

import { useDisclosure, Button } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from './redux/hooks';
import { socketConnect } from './redux/constants/actionCreators/socketActions';

import Join from './views/Join';
import Create from './views/Create';
import Lobby from './views/Lobby';
import HowItWorks from './components/HowItWorks';
import { selectAppView } from './redux/features/viewSlice';

function App() {
  const dispatch = useAppDispatch();
  const view = useAppSelector(selectAppView);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const views: { [key: string]: JSX.Element } = {
    join: <Join />,
    create: <Create />,
    lobby: <Lobby />,
  };

  useEffect(() => {
    dispatch(socketConnect());
  }, []);

  return (
    <section>
      <section className="app">
        {views[view]}
      </section>

      <section className="footer">
        <Button
          className="button-how-it-works"
          onClick={onOpen}
          variant="link"
          size="xs"
        >
          How billZ Works
        </Button>
        <HowItWorks isOpen={isOpen} onClose={onClose} />
      </section>
    </section>
  );
}

export default App;
