import React from 'react';

import { Box, Heading } from '@chakra-ui/react';
import { useAppSelector } from '../redux/hooks';
import { selectPartyCode } from '../redux/features/partySlice';

import '../styles/components/partyInfo.css';

function PartyInfo() {
  const partyCode = useAppSelector(selectPartyCode);

  return (
    <Box className="partyInfo">
      <Heading>{partyCode}</Heading>
    </Box>
  );
}

export default PartyInfo;
