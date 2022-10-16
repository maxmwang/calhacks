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

import Title from '../components/Title';

function Join() {
  const dispatch = useAppDispatch();

  const error = useAppSelector(selectError);

  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!code) {
      setCodeError('A room code is required');
    }
    if (!name) {
      setNameError('A name is required');
      return;
    }

    dispatch(partyJoin(code, name));
  };

  useEffect(() => {
    setCodeError('');
  }, [code]);
  useEffect(() => {
    setNameError('');
  }, [name]);
  useEffect(() => {
    if (!error) {
      return;
    }

    if (error.type === 'code') {
      setCodeError(error.message);
    }
    if (error.type === 'name') {
      setNameError(error.message);
    }
  }, [error]);

  return (
    <div>
      <Title />
      <form className="join" onSubmit={(e) => handleJoin(e)}>
        <VStack spacing={4}>
          <h1 className="header">Join A Room</h1>
          <Divider />

          <FormControl isRequired isInvalid={Boolean(codeError)}>
            <FormLabel>Room Code</FormLabel>
            <Input
              type="text"
              placeholder="qtw4f6"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <FormErrorMessage>{codeError}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={Boolean(nameError)}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Bob"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormErrorMessage>{nameError}</FormErrorMessage>
          </FormControl>

          <Button
            className="button-join"
            colorScheme="blue"
            onClick={handleJoin}
          >
            Join
          </Button>

          <Button
            size="sm"
            variant="link"
            color="blue"
            onClick={() => dispatch(appViewSet('create'))}
          >
            Create a Room
          </Button>
        </VStack>
      </form>
    </div>
  );
}

export default Join;
