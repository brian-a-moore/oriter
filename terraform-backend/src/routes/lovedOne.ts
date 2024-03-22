import { Router } from 'express';
import schemaValidator from '../middlewares/schemaValidator.middleware';
import * as schemas from '../schemas/lovedOne';
import controllers from '../controllers/lovedOne';

const router = Router();

router.post('/', schemaValidator(schemas.create), controllers.create);
router.get('/:lovedOneId', schemaValidator(schemas.list), controllers.list);
router.get('/list', schemaValidator(schemas.list), controllers.list);
router.delete('/:lovedOneId', schemaValidator(schemas.remove), controllers.remove);

export default router;
