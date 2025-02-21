import { Router } from 'express';
import mocksController from '../../controllers/mocks.controller.js';

const mocksRouter = Router();

mocksRouter.post('/mockingpets', mocksController.mockingPets);
mocksRouter.post('/mockingusers', mocksController.mockingUsers);
mocksRouter.post('/generateData', mocksController.dataGenerated);

export default mocksRouter;
