import { Router } from 'express';
import schemaValidator from '../middlewares/schemaValidator.middleware';
import * as schemas from '../schemas/lovedOne';
import * as controllers from '../controllers/lovedOne';
import checkPermission from '../middlewares/checkPermission.middleware';
import { canAccessLovedOne, canSubmitForm } from '../permissions';

const router = Router();

router.get('/:customerId/list', schemaValidator(schemas.list), controllers.list);
router.get('/:lovedOneId', schemaValidator(schemas.get), checkPermission([canAccessLovedOne]), controllers.get);
router.delete(
  '/:lovedOneId',
  schemaValidator(schemas.remove),
  checkPermission([canAccessLovedOne]),
  controllers.remove,
);

// This is the unauthenticated public route
router.put(
  '/:funeralHomeId/:customerId/:lovedOneId',
  checkPermission([canSubmitForm]),
  schemaValidator(schemas.update),
  controllers.update,
);

export default router;
