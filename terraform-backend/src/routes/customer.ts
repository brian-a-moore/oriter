import { Router } from 'express';
import schemaValidator from '../middlewares/schemaValidator.middleware';
import * as schemas from '../schemas/customer';
import controllers from '../controllers/customer';

const router = Router();

router.post('/', schemaValidator(schemas.create), controllers.create);
router.get('/:customerId', schemaValidator(schemas.list), controllers.list);
router.get('/list', schemaValidator(schemas.list), controllers.list);
router.delete('/:customerId', schemaValidator(schemas.remove), controllers.remove);
router.put('/', schemaValidator(schemas.update), controllers.update);

export default router;
