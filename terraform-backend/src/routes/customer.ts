import { Router } from 'express';
import schemaValidator from '../middlewares/schemaValidator.middleware';
import * as schemas from '../schemas/customer';
import * as controllers from '../controllers/customer';

const router = Router();

router.post('/', schemaValidator(schemas.create), controllers.create);
router.get('/:customerId', schemaValidator(schemas.list), controllers.list);
router.get('/:customerId/link', schemaValidator(schemas.link), controllers.link);
router.get('/list', schemaValidator(schemas.list), controllers.list);
router.delete('/:customerId', schemaValidator(schemas.remove), controllers.remove);
router.patch('/:customerId', schemaValidator(schemas.update), controllers.update);

export default router;
