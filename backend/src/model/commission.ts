import mongoose, { Document, Schema } from 'mongoose';

interface ICommission extends Document {
    courseId: mongoose.Types.ObjectId;
    rate: number;
}

const commissionSchema: Schema = new Schema({
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    rate: { type: Number, default: 0.4 }, // default commission rate (40%)
});

const Commission = mongoose.model<ICommission>('Commission', commissionSchema);

export default Commission;
