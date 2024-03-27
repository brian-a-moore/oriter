import { Router } from 'express';
import schemaValidator from '../middlewares/schemaValidator.middleware';
import * as adminUserSchemas from '../schemas/admin/user';
import * as funeralHomeSchemas from '../schemas/admin/funeralHome';
import userControllers from '../controllers/admin/user';
import funeral_homeControllers from '../controllers/admin/funeralHome';

const router = Router();

// Managing Admins
router.post('/', schemaValidator(adminUserSchemas.create), userControllers.create);
router.get('/list', schemaValidator(adminUserSchemas.list), userControllers.list);
router.get('/:adminId', schemaValidator(adminUserSchemas.get), userControllers.get);
router.delete('/:adminId', schemaValidator(adminUserSchemas.remove), userControllers.remove);
router.patch('/:adminId', schemaValidator(adminUserSchemas.update), userControllers.update);

// Managing Funeral Homes
router.post('/funeral_home', schemaValidator(funeralHomeSchemas.create), funeral_homeControllers.create);
router.get('/funeral_home/list', schemaValidator(funeralHomeSchemas.list), funeral_homeControllers.list);
router.get('/funeral_home/:funeralHomeId', schemaValidator(funeralHomeSchemas.list), funeral_homeControllers.list);
router.delete(
  '/funeral_home/:funeralHomeId',
  schemaValidator(funeralHomeSchemas.remove),
  funeral_homeControllers.remove,
);
router.put('/funeral_home/:funeralHomeId', schemaValidator(funeralHomeSchemas.update), funeral_homeControllers.update);

export default router;
