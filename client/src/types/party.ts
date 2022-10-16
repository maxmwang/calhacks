import TItem from './item';

type TParty = {
  name: string;
  code: string;
  host: string;
  members: string[];
  itemsId: TItem[];
  tip: number;
  tax: number;
};

export default TParty;
