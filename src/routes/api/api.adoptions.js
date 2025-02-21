import { Router} from 'express';
import adoptionsController from '../../controllers/adoptions.controller.js'

const adoptionsRouter = Router();

adoptionsRouter.get('/', adoptionsController.getAllAdoptions);
adoptionsRouter.get('/:aid',adoptionsController.getAdoption);
adoptionsRouter.post('/:uid/:pid',adoptionsController.createAdoption);

export default adoptionsRouter;