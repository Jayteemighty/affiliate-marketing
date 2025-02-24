import mongoose, { Document, Schema } from 'mongoose';

interface IAffiliateDocument extends Document {
  affiliateId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  sales: number;
  revenueGenerated: number;
  createdAt: Date;
}

const affiliateSchema = new Schema<IAffiliateDocument>({
  affiliateId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  sales: {
    type: Number,
    default: 0,
  },
  revenueGenerated: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Affiliate = mongoose.model<IAffiliateDocument>('Affiliate', affiliateSchema);
export default Affiliate;