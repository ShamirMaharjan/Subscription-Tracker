import { DB_URL, NODE_ENV } from "../config/env.js"
import mongoose from "mongoose";

if (!DB_URL) {
    throw new Error('DB_URL is not defined');
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URL);

        console.log(`Connected to database: ${NODE_ENV} mode`);

    } catch (error) {
        console.log("Error connecting to database: ", error)
    }
}
export default connectToDatabase;