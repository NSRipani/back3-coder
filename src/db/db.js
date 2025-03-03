import dotenv from 'dotenv';
import { connect } from "mongoose";
dotenv.config()

async function dbConnect() {
    try {
        await connect(process.env.MONGO_URL);
        console.log("mongo db connected");
    } catch (error) {
        console.log(error.message);
    }
}

export default dbConnect;