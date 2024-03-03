import { Request, Response } from 'express';
import { STATUS_CODE } from '../../config/constants';

export default (req: Request, res: Response) => {
  console.log('req', req);
  res.sendStatus(STATUS_CODE.NOT_IMPLEMENTED);
};
