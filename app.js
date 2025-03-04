import express from 'express'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import router from './src/routes/index.route.js';
import dbConnect from './src/db/db.js';
import { createServer } from 'http';
// import cluster from 'cluster';
// import os from 'os';

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

// if (cluster.isPrimary) {
//     // Crea un worker por cada núcleo del CPU
//     const numCPUs = os.cpus().length;
//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }

//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`Worker ${worker.process.pid} died`);
//     });
// } else {
//     // Los workers pueden compartir cualquier servidor TCP
//     http.createServer((req, res) => {
//         res.writeHead(200);
//         res.end('Hola Mundo!\n');
//     }).listen(8000);
// }
