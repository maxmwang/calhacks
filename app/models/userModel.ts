import mongoose, { Schema } from 'mongoose';

export type TUser = mongoose.Document & {
  username: string;
  password: string;
};
export const UserSchema = new Schema<TUser>({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    select: false,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    select: false,
  },
}, {
  timestamps: true,
});

export default mongoose.model('User', UserSchema);
