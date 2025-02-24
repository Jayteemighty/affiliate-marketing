import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        mongoose.set('strictQuery', true);
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`This is an error ${error}`);
        process.exit(1);
    }
};

export default connectDB;