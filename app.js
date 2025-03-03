import express from 'express'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import router from './src/routes/index.route.js';
import dbConnect from './src/db/db.js';
import { createServer } from 'http';

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser());

const port = process.env.PORT || 3000;
const ready = () => {
    console.log("server ready on port " + port);
    dbConnect()
}
const httpServer = createServer(app);
httpServer.listen(port, ready);

app.use(router)