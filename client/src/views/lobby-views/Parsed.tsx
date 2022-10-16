/* eslint-disable no-restricted-syntax */
import React, { useEffect } from 'react';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Checkbox,
} from '@chakra-ui/react';
import recognize from '../../api/recognize';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { itemAdd } from '../../redux/constants/actionCreators/itemActions';
import { selectItems, selectPartyCode } from '../../redux/features/partySlice';
import TItem from '../../types/item';

type Props = {
  image: string;
};
function Parsed({ image }: Props) {
  const self = useAppSelector((state) => state.self);
  const partyCode = useAppSelector(selectPartyCode);
  const dbItems = useAppSelector(selectItems) as TItem[];

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      const items = await recognize(image) as string[];
      for (const item of items) {
        dispatch(itemAdd(partyCode, { name: item[0], price: Number(item[1].slice(1)) }));
      }
    }

    if (image) {
      fetchData();
    }
  }, [image]);

  if (typeof dbItems[0] === 'string') {
    return (<div />);
  }

  console.log(dbItems);

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Claim</Th>
            <Th>Item Name</Th>
            <Th isNumeric>Price</Th>
            <Th>People</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dbItems.map((item: TItem) => (
            <Tr key={item.name}>
              <Td><Checkbox isChecked={item.ownersId && item.ownersId!.includes(self.id)} /></Td>
              <Td>{item.name}</Td>
              <Td isNumeric>
                $
                {item.price}
              </Td>
              <Td>some people</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default Parsed;
