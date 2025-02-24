import mongoose, { Document, Schema } from 'mongoose';

interface ICourse {
    courseId: mongoose.Types.ObjectId;
    affiliateLink: string;
}

interface IAffiliate extends Document {
    name: string;
    email: string;
    password: string;
    courses: ICourse[];
    todaySales: number;
    overallSales: number;
    todayAffiliateEarnings: number;
    overallAffiliateEarnings: number;
    availableAffiliateEarnings: number;
    withdrawalFee: number;
}

const affiliateSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    courses: [
        {
            courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
            affiliateLink: { type: String, required: true },
        },
    ],
    todaySales: { type: Number, default: 0 },
    overallSales: { type: Number, default: 0 },
    todayAffiliateEarnings: { type: Number, default: 0 },
    overallAffiliateEarnings: { type: Number, default: 0 },
    availableAffiliateEarnings: { type: Number, default: 0 },
    withdrawalFee: { type: Number, default: 0 },
});

const Affiliate = mongoose.model<IAffiliate>('Affiliate', affiliateSchema);

export default Affiliate;
