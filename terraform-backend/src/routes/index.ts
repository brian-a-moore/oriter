import { Router } from 'express';
import customer from './customer';
import formResponse from './formResponse';
import funeralHome from './funeralHome';

const router = Router();

router.use('/:funeralHome', funeralHome);
router.use('/:funeralHome/customer', customer);
router.use('/:funeralhome/:customerId/response', formResponse);

export default router;
