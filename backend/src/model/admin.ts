import mongoose, { Document, Schema } from 'mongoose';

interface IAdmin extends Document {
    username: string;
    password: string;
    role: string;
}

const adminSchema: Schema = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Admin = mongoose.model<IAdmin>('Admin', adminSchema);

export default Admin;
