import { Router } from 'express';
import schemaValidator from '../middlewares/schemaValidator.middleware';
import * as schemas from '../schemas/funeralHome';
import * as controllers from '../controllers/funeralHome';
import checkPermission from '../middlewares/checkPermission.middleware';
import canAccessFuneralHome from '../permissions/canAccessFuneralHome';

const router = Router();

router.get('/', schemaValidator(schemas.get), checkPermission([canAccessFuneralHome]), controllers.get);
router.put('/', schemaValidator(schemas.update), checkPermission([canAccessFuneralHome]), controllers.update);

export default router;
