import { Router } from 'express';
import mocksController from '../../controllers/mocks.controller.js';

const mocksRouter = Router();

mocksRouter.get('/mockingpets', mocksController.mockingPets);
mocksRouter.get('/mockingusers', mocksController.mockingUsers);
mocksRouter.post('/generateData', mocksController.dataGenerated);

export default mocksRouter;
