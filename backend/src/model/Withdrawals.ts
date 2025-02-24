import mongoose, { Document, Schema } from 'mongoose';

interface IWithdrawalDocument extends Document {
  amount: number;
  status: string;
  bankName: string;
  accountNumber: string;
  date: Date;
  userId: mongoose.Types.ObjectId;
}

const withdrawalSchema = new Schema<IWithdrawalDocument>({
  amount: { type: Number, required: true },
  status: { type: String, required: true },
  bankName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  date: { type: Date, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Withdrawal = mongoose.model<IWithdrawalDocument>('Withdrawal', withdrawalSchema);
export default Withdrawal;