import { Router } from 'express';
import schemaValidator from '../middlewares/schemaValidator.middleware';
import * as schemas from '../schemas/auth';
import authControllers from '../controllers/auth';

const router = Router();

router.post('/login', schemaValidator(schemas.login), authControllers.login);
router.post('/update_password', schemaValidator(schemas.updatePassword), authControllers.updatePassword);
router.post('/verify_link', schemaValidator(schemas.verifyLink), authControllers.verifyLink);
router.post('/verify_token', schemaValidator(schemas.verifyToken), authControllers.verifyToken);

export default router;
