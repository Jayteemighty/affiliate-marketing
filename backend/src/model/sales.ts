import mongoose, { Document, Schema } from 'mongoose';

interface ISale extends Document {
    vendor: mongoose.Types.ObjectId;
    amount: number;
    commission: number;
    date: Date;
}

const saleSchema: Schema = new Schema({
    vendor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    commission: { type: Number, required: true },
    date: { type: Date, default: Date.now },
}, {
    timestamps: true,
});

const Sale = mongoose.model<ISale>('Sale', saleSchema);

export default Sale;
