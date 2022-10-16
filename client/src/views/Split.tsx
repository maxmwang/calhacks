import React, { useState } from 'react';

import SplitLanding from './split-views/SplitLanding';
import JoinParty from './split-views/JoinParty';
import CreateParty from './split-views/CreateParty';

import '../styles/split.css';

function Split() {
  const [view, setView] = useState('split');

  const views: { [key: string]: JSX.Element } = {
    split: <SplitLanding setView={setView} />,
    join: <JoinParty setView={setView} />,
    create: <CreateParty setView={setView} />,
  };

  return (
    <div>
      {views[view]}
    </div>
  );
}

export default Split;
