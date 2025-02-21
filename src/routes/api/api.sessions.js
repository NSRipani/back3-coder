import { Router } from 'express';
import sessionsController from '../../controllers/sessions.controller.js';

const sessionsRouter = Router();

sessionsRouter.post('/register',sessionsController .register);
sessionsRouter.post('/login',sessionsController.login);
sessionsRouter.get('/current',sessionsController.current);
sessionsRouter.get('/unprotectedLogin',sessionsController.unprotectedLogin);
sessionsRouter.get('/unprotectedCurrent',sessionsController.unprotectedCurrent);

export default sessionsRouter;