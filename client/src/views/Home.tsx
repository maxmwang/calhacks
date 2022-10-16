import React, { useState, useEffect } from 'react';
import {
  Input,
  VStack,
  Button,
  Divider,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectError } from '../redux/features/errorSlice';
import { partyJoin } from '../redux/constants/actionCreators/partyActions';
import { appViewSet } from '../redux/constants/actionCreators/socketActions';

import JoinPartyDetails from '../components/JoinPartyDetails';
import { selectAppView } from '../redux/features/viewSlice';
import '../styles/split.css';
import Join from './Join';

function Home() {
  const dispatch = useAppDispatch();

  const view = useAppSelector(selectAppView);

  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  return (
    <div>
      <JoinPartyDetails />
    </div>
  );
}

export default Home;
