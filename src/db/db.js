import { connect } from "mongoose";
import 'dotenv/config';

async function dbConnect() {
    try {
        await connect(process.env.MONGO_URL);
        console.log("mongo db connected");
    } catch (error) {
        console.log(error.message);
    }
}

export default dbConnect;