import React from 'react';

import JoinPartyButton from '../../components/JoinPartyButton';
import CreatePartyButton from '../../components/CreatePartyButton';
// import { useAppDispatch } from '../../redux/hooks';
// import { appViewSet } from '../../redux/constants/actionCreators/socketActions';

type Props = {
  setView: (view: string) => void;
};
function SplitLanding({ setView } : Props) {
  // const dispatch = useAppDispatch();

  return (
    <div>
      <div id="container">
        <svg href="../images/split_log.svg" />
        <JoinPartyButton
          // onBack={() => setView('split')}
          onClick={() => setView('join')}
          // onSubmit={() => dispatch(appViewSet('lobby'))}
        />
        <CreatePartyButton
          onClick={() => setView('create')}
        />
      </div>
    </div>
  );
}

export default SplitLanding;
