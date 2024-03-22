import { Response } from 'express';
import { OriterRequest } from '../../types';
import { STATUS_CODE } from '../../constants';

export default (req: OriterRequest, res: Response) => {
  console.log('req', { params: req.params, body: req.body });
  res.sendStatus(STATUS_CODE.NOT_IMPLEMENTED);
};
