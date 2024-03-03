import { Router } from 'express';
import schemaValidator from '../middlewares/schemaValidator.middleware';
import * as schemas from '../schemas/admin/funeralHome';
import userControllers from '../controllers/admin/user';
import funeral_homeControllers from '../controllers/admin/funeralHome';

const router = Router();

// Managing Admins
router.post('/', schemaValidator(schemas.create), userControllers.create);
router.get('/:adminId', schemaValidator(schemas.list), userControllers.list);
router.get('/list', schemaValidator(schemas.list), userControllers.list);
router.delete('/:adminId', schemaValidator(schemas.remove), userControllers.remove);
router.put('/:adminId', schemaValidator(schemas.update), userControllers.update);

// Managing Funeral Homes
router.post('/funeral_home', schemaValidator(schemas.create), funeral_homeControllers.create);
router.get('/funeral_home/:funeralHomeId', schemaValidator(schemas.list), funeral_homeControllers.list);
router.get('/funeral_home/list', schemaValidator(schemas.list), funeral_homeControllers.list);
router.delete('/funeral_home/:funeralHomeId', schemaValidator(schemas.remove), funeral_homeControllers.remove);
router.put('/funeral_home/:funeralHomeId', schemaValidator(schemas.update), funeral_homeControllers.update);

export default router;
