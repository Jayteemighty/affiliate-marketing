import mongoose, { Document, Schema } from 'mongoose';

interface IUserDocument extends Document {
  username: string;
  email: string;
  password: string;
  todaySales: number;
  overallSales: number;
  todayEarnings: number;
  overallEarnings: number;
  todayAffiliateEarnings: number;
  overallAffiliateEarnings: number;
  affiliateId?: mongoose.Types.ObjectId;
}

const userSchema = new Schema<IUserDocument>({
  username: String,
  email: String,
  password: String,
  todaySales: { type: Number, default: 0 },
  overallSales: { type: Number, default: 0 },
  todayEarnings: { type: Number, default: 0 },
  overallEarnings: { type: Number, default: 0 },
  todayAffiliateEarnings: { type: Number, default: 0 },
  overallAffiliateEarnings: { type: Number, default: 0 },
  affiliateId: { type: Schema.Types.ObjectId, ref: 'User' }
});

const User = mongoose.model<IUserDocument>('User', userSchema);
export default User;