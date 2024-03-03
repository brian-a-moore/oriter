import { Router } from 'express';
import schemaValidator from '../middlewares/schemaValidator.middleware';
import * as schemas from '../schemas/formResponse';
import controllers from '../controllers/formResponse';

const router = Router();

router.post('/', schemaValidator(schemas.create), controllers.create);
router.get('/:responseId', schemaValidator(schemas.list), controllers.list);
router.get('/list', schemaValidator(schemas.list), controllers.list);
router.delete('/:responseId', schemaValidator(schemas.remove), controllers.remove);

export default router;
