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

import JoinParty from '../components/JoinParty';
import CreateParty from '../components/CreateParty';
import { selectAppView } from '../redux/features/viewSlice';
import '../styles/split.css';
import Join from './Join';

function Split() {
  console.log("hi there im spit")
  const dispatch = useAppDispatch();

  const view = useAppSelector(selectAppView);
  console.log(view)

  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  return (
    <div>
      <div id="container">
        <svg href="../images/split_log.svg"></svg>
        <JoinParty />
        <CreateParty />
      </div>
      <div id="footer">

      </div>
    </div>
  );
}

export default Split;
