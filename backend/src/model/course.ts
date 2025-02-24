import mongoose, { Document, Schema } from 'mongoose';

interface ILesson {
    title: string;
    content: string;
}

interface ICourse extends Document {
    title: string;
    description: string;
    price: number;
    instructor: mongoose.Types.ObjectId;
    createdAt: Date;
    lessons: ILesson[];
}

const courseSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lessons: [
        {
            title: { type: String, required: true },
            content: { type: String, required: true },
        },
    ],
});

const Course = mongoose.model<ICourse>('Course', courseSchema);

export default Course;
