import { Router } from 'express';
import schemaValidator from '../middlewares/schemaValidator.middleware';
import * as schemas from '../schemas/funeralHome';
import * as controllers from '../controllers/funeralHome';
import checkPermission from '../middlewares/checkPermission.middleware';
import { canAccessFuneralHome } from '../permissions';

const router = Router();

router.get('/:funeralHomeId', schemaValidator(schemas.get), checkPermission([canAccessFuneralHome]), controllers.get);
router.patch(
  '/:funeralHomeId',
  schemaValidator(schemas.update),
  checkPermission([canAccessFuneralHome]),
  controllers.update,
);

export default router;
