import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DBconnection = async () => {
    const URL = process.env.MONGO_URI;
    
    if (!URL) {
        console.error('MONGO_URI is not defined in environment variables');
        return;
    }

    try {
        await mongoose.connect(URL);
        console.log('MongoDB connection established successfully');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
};

export default DBconnection;
