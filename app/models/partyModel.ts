import mongoose, { Schema } from 'mongoose';

import { ItemSchema, TItem } from './itemModel';

export type TParty = mongoose.Document & {
  name: string;
  code: string;
  host: string;
  members: string[];
  items: TItem[];
  tip: number;
  tax: number;
};
export const PartySchema = new Schema<TParty>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    limit: 6,
  },
  host: {
    type: String,
    required: true,
    trim: true,
  },
  members: {
    type: [String],
    required: true,
  },
  items: {
    type: [ItemSchema],
    required: true,
    default: [],
  },
  tip: {
    type: Number,
    required: true,
    default: 0,
  },
  tax: {
    type: Number,
    required: true,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Party', PartySchema);
