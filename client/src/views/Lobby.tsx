import React, { useState } from 'react';
import {
  Tab,
  Tabs,
  VStack,
  TabList,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react';

import Receipt from './lobby-views/Receipt';
import Parsed from './lobby-views/Parsed';
import Split from './lobby-views/Split';

import PartyInfo from '../components/PartyInfo';

import '../styles/lobby.css';

function Lobby() {
  const [image, setImage] = useState('');

  return (
    <VStack className="lobby">
      <PartyInfo />

      <Tabs>
        <TabList>
          <Tab>Receipt</Tab>
          <Tab>Parsed</Tab>
          <Tab>Split</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Receipt image={image} setImage={setImage} />
          </TabPanel>
          <TabPanel>
            <Parsed image={image} />
          </TabPanel>
          <TabPanel>
            <Split />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}

export default Lobby;
