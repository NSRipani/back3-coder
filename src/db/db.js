import dotenv from 'dotenv';
import { connect } from "mongoose";
import { logger } from '../utils/logger.js';
dotenv.config();

async function dbConnect() {
    try {
        await connect(process.env.MONGO_URL);
        logger.info("mongo db connected");
    } catch (error) {
        logger.error(error.message);
    }
}

export default dbConnect;