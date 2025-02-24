import mongoose, { Document, Schema } from 'mongoose';

interface IUserRegisteredCourse extends Document {
    name: string;
    email: string;
    phone: string;
    password: string;
    courseid: string;
}

const courseSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    courseid: { type: String, required: true },
});

const UserRegisteredCourse = mongoose.model<IUserRegisteredCourse>('UserRegisteredCourse', courseSchema);

export default UserRegisteredCourse;
