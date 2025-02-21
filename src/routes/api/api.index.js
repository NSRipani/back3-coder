import { Router } from "express";
import userRouter from "./api.users.js";
import petsRouter from "./api.pets.js";
import adoptionsRouter from "./api.adoptions.js";
import sessionsRouter from "./api.sessions.js";
import mocksRouter from "./api.mocks.js";

const apiRouter = Router();

apiRouter.use("/users", userRouter)
apiRouter.use("/pets", petsRouter)
apiRouter.use("/adoptions", adoptionsRouter)
apiRouter.use("/sessions", sessionsRouter)
apiRouter.use("/mocks", mocksRouter)

export default apiRouter
