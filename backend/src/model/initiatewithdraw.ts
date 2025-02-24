import mongoose, { Document, Schema } from 'mongoose';

interface IInitiateWithdraw extends Document {
    userId: mongoose.Types.ObjectId;
    amount: number;
    bankName: string;
    accountNumber: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    date: Date;
}

const initiateWithdrawSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',  // This references the User model
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    bankName: {
        type: String,
        required: true,
    },
    accountNumber: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const InitiateWithdraw = mongoose.model<IInitiateWithdraw>('InitiateWithdraw', initiateWithdrawSchema);

export default InitiateWithdraw;
