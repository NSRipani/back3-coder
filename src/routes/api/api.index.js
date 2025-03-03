import { Router } from "express";
import userRouter from "./api.users.js";
import petsRouter from "./api.pets.js";
import adoptionsRouter from "./api.adoptions.js";
import sessionsRouter from "./api.sessions.js";
import mocksRouter from "./api.mocks.js";
import { swaggerOptions } from '../../utils/swagger.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";

const apiRouter = Router();

apiRouter.use("/users", userRouter)
apiRouter.use("/pets", petsRouter)
apiRouter.use("/adoptions", adoptionsRouter)
apiRouter.use("/sessions", sessionsRouter)
apiRouter.use("/mocks", mocksRouter)

const specs = swaggerJSDoc(swaggerOptions)
apiRouter.use("/docs",swaggerUi.serve,swaggerUi.setup(specs))

export default apiRouter
