import { Router } from 'express';
import schemaValidator from '../middlewares/schemaValidator.middleware';
import * as schemas from '../schemas/customer';
import * as controllers from '../controllers/customer';
import checkPermission from '../middlewares/checkPermission.middleware';
import { canAccessCustomer } from '../permissions';

const router = Router();

router.post('/', schemaValidator(schemas.create), controllers.create);
router.get('/list', schemaValidator(schemas.list), controllers.list);
router.get('/:customerId', schemaValidator(schemas.get), checkPermission([canAccessCustomer]), controllers.get);
router.get('/:customerId/link', schemaValidator(schemas.link), checkPermission([canAccessCustomer]), controllers.link);
router.delete(
  '/:customerId',
  schemaValidator(schemas.remove),
  checkPermission([canAccessCustomer]),
  controllers.remove,
);
router.put('/:customerId', schemaValidator(schemas.update), checkPermission([canAccessCustomer]), controllers.update);

export default router;
