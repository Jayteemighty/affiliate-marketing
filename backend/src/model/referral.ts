import mongoose, { Document, Schema } from 'mongoose';

interface IReferral extends Document {
    course: mongoose.Types.ObjectId;
    affiliate: mongoose.Types.ObjectId;
    referredUser: string;
}

const referralSchema: Schema = new Schema({
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    affiliate: { type: Schema.Types.ObjectId, ref: 'Affiliate', required: true },
    referredUser: { type: String, required: true },
});

const Referral = mongoose.model<IReferral>('Referral', referralSchema);

export default Referral;
