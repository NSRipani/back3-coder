import express from 'express'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import router from './src/routes/index.route.js';
import dbConnect from './src/db/db.js';
import { createServer } from 'http';
import { logger } from './src/utils/logger.js';
// import cluster from 'cluster';
// import { cpus } from 'os';

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser());

const port = process.env.PORT || 3000;
const ready = () => {
    logger.info("server ready on port " + port);
    dbConnect()
}
const httpServer = createServer(app);
httpServer.listen(port, ready);

app.use(router)

// if(cluster.isPrimary){
//     console.log("Soy el cluster principal")
//     for(let i = 0; i < cpus().length; i++){
//         cluster.fork()
//     }

//     cluster.on("exit", (worker) => {
//         console.log(`Worker ${worker.process.pid} died`)
//         cluster.fork()
//     })
// }else{
//     console.log(`Soy el cluster ${process.pid}`)
//     const port = process.env.PORT || 3000;
//     const ready = () => {
//         console.log("server ready on port " + port);
//         dbConnect()
//     }
//     const httpServer = createServer(app);
//     httpServer.listen(port, ready);
//     // app.listen(PORT, () => {
//     //     console.log(`Server is running on port ${PORT}`);
//     // });
// }
