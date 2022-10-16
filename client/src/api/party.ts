import TItem from './item';

type TParty = {
  name: string;
  code: string;
  host: string;
  members: string[];
  items: TItem[];
  tip: number;
  tax: number;
};

export default TParty;
