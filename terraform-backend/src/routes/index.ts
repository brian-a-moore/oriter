import { Router } from 'express';
import admin from './admin';
import auth from './auth';
import customer from './customer';
import formResponse from './formResponse';
import funeralHome from './funeralHome';

const router = Router();

router.use('/admin', admin);
router.use('/auth', auth);
router.use('/funeral-home', funeralHome);
router.use('/customer', customer);
router.use('/response', formResponse);

export default router;
