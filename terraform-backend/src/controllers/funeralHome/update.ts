import { Request, Response } from 'express';
import { STATUS_CODE } from '../../constants';

export default (req: Request, res: Response) => {
  console.log('req', { params: req.params, body: req.body });
  res.sendStatus(STATUS_CODE.NOT_IMPLEMENTED);
};
