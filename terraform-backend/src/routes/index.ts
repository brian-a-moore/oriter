import { Router } from 'express';
import admin from './admin';
import auth from './auth';
import customer from './customer';
import lovedOne from './lovedOne';
import funeralHome from './funeralHome';

const router = Router();

router.use('/admin', admin);
router.use('/auth', auth);
router.use('/funeral_home', funeralHome);
router.use('/customer', customer);
router.use('/loved_one', lovedOne);

export default router;
