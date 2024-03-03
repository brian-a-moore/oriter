import { Router } from 'express';
import schemaValidator from '../middlewares/schemaValidator.middleware';
import * as schemas from '../schemas/funeralHome';
import controllers from '../controllers/funeralHome';

const router = Router();

router.get('/', schemaValidator(schemas.get), controllers.get);
router.put('/', schemaValidator(schemas.update), controllers.update);

export default router;
