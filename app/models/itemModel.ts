import mongoose, { Schema } from 'mongoose';

export type TItem = mongoose.Document & {
  name: string;
  price: number;
  owner: string;
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
  owner: {
    type: String,
    required: true,
    default: '',
  },
}, {
  timestamps: true,
});

export default mongoose.model('Item', ItemSchema);
