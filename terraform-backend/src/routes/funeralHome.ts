import { Router } from 'express';
import schemaValidator from '../middlewares/schemaValidator.middleware';
import * as schemas from '../schemas/funeralHome';
import controllers from '../controllers/funeralHome';

const router = Router();

router.post('/', schemaValidator(schemas.create), controllers.create);
router.get('/:funeralHomeId', schemaValidator(schemas.list), controllers.list);
router.get('/list', schemaValidator(schemas.list), controllers.list);
router.delete('/:funeralHomeId', schemaValidator(schemas.remove), controllers.remove);
router.put('/', schemaValidator(schemas.update), controllers.update);

export default router;
