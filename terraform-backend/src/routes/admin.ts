import { Router } from 'express';
import schemaValidator from '../middlewares/schemaValidator.middleware';
import * as adminUserSchemas from '../schemas/admin/user';
import * as funeralHomeSchemas from '../schemas/admin/funeralHome';
import * as userControllers from '../controllers/admin/user';
import * as funeral_homeControllers from '../controllers/admin/funeralHome';
import permissionMiddleware from '../middlewares/permission.middleware';
import { canDeleteAdmin, canUpdateAdmin, canUseAdminRoutes } from '../permissions';

const router = Router();

// Managing Admins
router.post(
  '/',
  schemaValidator(adminUserSchemas.create),
  permissionMiddleware([canUseAdminRoutes]),
  userControllers.create,
);
router.get(
  '/list',
  schemaValidator(adminUserSchemas.list),
  permissionMiddleware([canUseAdminRoutes]),
  userControllers.list,
);
router.get(
  '/:adminId',
  schemaValidator(adminUserSchemas.get),
  permissionMiddleware([canUseAdminRoutes]),
  userControllers.get,
);
router.delete(
  '/:adminId',
  schemaValidator(adminUserSchemas.remove),
  permissionMiddleware([canUseAdminRoutes, canDeleteAdmin]),
  userControllers.remove,
);
router.patch(
  '/:adminId',
  schemaValidator(adminUserSchemas.update),
  permissionMiddleware([canUseAdminRoutes, canUpdateAdmin]),
  userControllers.update,
);

// Managing Funeral Homes
router.post(
  '/funeral_home',
  schemaValidator(funeralHomeSchemas.create),
  permissionMiddleware([canUseAdminRoutes]),
  funeral_homeControllers.create,
);
router.get(
  '/funeral_home/list',
  schemaValidator(funeralHomeSchemas.list),
  permissionMiddleware([canUseAdminRoutes]),
  funeral_homeControllers.list,
);
router.get(
  '/funeral_home/:funeralHomeId',
  schemaValidator(funeralHomeSchemas.list),
  permissionMiddleware([canUseAdminRoutes]),
  funeral_homeControllers.list,
);
router.delete(
  '/funeral_home/:funeralHomeId',
  schemaValidator(funeralHomeSchemas.remove),
  permissionMiddleware([canUseAdminRoutes]),
  funeral_homeControllers.remove,
);
router.put(
  '/funeral_home/:funeralHomeId',
  schemaValidator(funeralHomeSchemas.update),
  permissionMiddleware([canUseAdminRoutes]),
  funeral_homeControllers.update,
);

export default router;
