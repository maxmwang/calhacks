import mongoose, { ObjectId, Schema } from 'mongoose';

export type TParty = mongoose.Document & {
  name: string;
  code: string;
  host: string;
  membersId: ObjectId[];
  itemsId: ObjectId[];
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
  membersId: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
  },
  itemsId: {
    type: [mongoose.Schema.Types.ObjectId],
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
