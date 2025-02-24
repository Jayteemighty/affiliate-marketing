import mongoose, { Document, Schema } from 'mongoose';

interface IPayment extends Document {
    userId: mongoose.Types.ObjectId;
    amount: number;
    reference: string;
    status: string;
    authorization_url: string;
}

const PaymentSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    reference: { type: String, required: true, unique: true },
    status: { type: String, default: 'pending' },
    authorization_url: { type: String, required: true },
});

const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);

export default Payment;
