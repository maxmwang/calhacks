import React, { useState, useEffect } from 'react';
import {
  Input,
  VStack,
  Button,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Divider,
} from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectError } from '../redux/features/errorSlice';
import { partyCreate } from '../redux/constants/actionCreators/partyActions';
import { appViewSet } from '../redux/constants/actionCreators/socketActions';

import Title from '../components/Title';

function Create() {
  const dispatch = useAppDispatch();

  const error = useAppSelector(selectError);

  const [partyName, setPartyName] = useState('');
  const [partyNameError, setPartyNameError] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const handleCreate = () => {
    if (!name) {
      setNameError('A name is required');
      return;
    }
    if (name && !partyName) {
      setPartyName(`${name}'s Party`);
    }

    dispatch(partyCreate(partyName, name));
  };

  useEffect(() => {
    setNameError('');
  }, [name]);
  useEffect(() => {
    setPartyNameError('');
  }, [partyName]);
  useEffect(() => {
    if (!error) {
      return;
    }

    if (error.type === 'name') {
      setNameError(error.message);
    }
  }, [error]);

  return (
    <div>
      <Title />
      <section className="create">
        <VStack spacing={4}>
          <h1 className="header">Create A Party</h1>
          <Divider />

          <FormControl isInvalid={Boolean(partyNameError)}>
            <FormLabel>Party Name</FormLabel>
            <Input
              type="text"
              placeholder={name ? `${name}'s Party` : "Bob's Party"}
              value={partyName}
              onChange={(e) => setPartyName(e.target.value)}
            />
            <FormErrorMessage>{partyNameError}</FormErrorMessage>
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
            className="button-create"
            colorScheme="blue"
            onClick={handleCreate}
          >
            Create
          </Button>

          <Button
            size="sm"
            variant="link"
            color="blue"
            onClick={() => dispatch(appViewSet('join'))}
          >
            Join a Party
          </Button>
        </VStack>
      </section>
    </div>
  );
}
export default Create;
