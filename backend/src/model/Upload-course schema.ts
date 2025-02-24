import mongoose, { Document, Schema } from 'mongoose';

interface ICourseDocument extends Document {
  name: string;
  sellerName: string;
  ownerEmail: string | null;
  price: number;
  description: string;
  createdAt: Date;
}

const courseSchema = new Schema<ICourseDocument>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  sellerName: {
    type: String,
    required: true,
    trim: true,
  },
  ownerEmail: {
    type: String,
    default: null,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model<ICourseDocument>('Course', courseSchema);
export default Course;