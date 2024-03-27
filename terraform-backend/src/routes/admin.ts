import { Router } from 'express';
import schemaValidator from '../middlewares/schemaValidator.middleware';
import * as adminUserSchemas from '../schemas/admin/user';
import * as funeralHomeSchemas from '../schemas/admin/funeralHome';
import * as userControllers from '../controllers/admin/user';
import * as funeral_homeControllers from '../controllers/admin/funeralHome';
import checkPermission from '../middlewares/checkPermission.middleware';
import { canDeleteAdmin, canUpdateAdmin, canUseAdminRoutes } from '../permissions';

const router = Router();

// Managing Admins
router.post(
  '/',
  schemaValidator(adminUserSchemas.create),
  checkPermission([canUseAdminRoutes]),
  userControllers.create,
);
router.get('/list', schemaValidator(adminUserSchemas.list), checkPermission([canUseAdminRoutes]), userControllers.list);
router.get(
  '/:adminId',
  schemaValidator(adminUserSchemas.get),
  checkPermission([canUseAdminRoutes]),
  userControllers.get,
);
router.delete(
  '/:adminId',
  schemaValidator(adminUserSchemas.remove),
  checkPermission([canUseAdminRoutes, canDeleteAdmin]),
  userControllers.remove,
);
router.patch(
  '/:adminId',
  schemaValidator(adminUserSchemas.update),
  checkPermission([canUseAdminRoutes, canUpdateAdmin]),
  userControllers.update,
);

// Managing Funeral Homes
router.post(
  '/funeral_home',
  schemaValidator(funeralHomeSchemas.create),
  checkPermission([canUseAdminRoutes]),
  funeral_homeControllers.create,
);
router.get(
  '/funeral_home/list',
  schemaValidator(funeralHomeSchemas.list),
  checkPermission([canUseAdminRoutes]),
  funeral_homeControllers.list,
);
router.get(
  '/funeral_home/:funeralHomeId',
  schemaValidator(funeralHomeSchemas.get),
  checkPermission([canUseAdminRoutes]),
  funeral_homeControllers.get,
);
router.delete(
  '/funeral_home/:funeralHomeId',
  schemaValidator(funeralHomeSchemas.remove),
  checkPermission([canUseAdminRoutes]),
  funeral_homeControllers.remove,
);
router.patch(
  '/funeral_home/:funeralHomeId',
  schemaValidator(funeralHomeSchemas.update),
  checkPermission([canUseAdminRoutes]),
  funeral_homeControllers.update,
);

export default router;
