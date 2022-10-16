import mongoose, { ObjectId, Schema } from 'mongoose';

export type TItem = mongoose.Document & {
  name: string;
  price: number;
  ownerIds: ObjectId[];
};
export const ItemSchema = new Schema<TItem>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ownerIds: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    default: [],
  },
}, {
  timestamps: true,
});

export default mongoose.model('Item', ItemSchema);
