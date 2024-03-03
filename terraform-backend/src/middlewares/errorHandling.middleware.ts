import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE } from '../config/constants';

export default (err: any | unknown, req: Request, res: Response, next: NextFunction) => {
  if (!err) {
    return next();
  }

  console.error('Error:', err.message);

  if (res.headersSent) {
    next();
  }

  res.status(err.status || STATUS_CODE.SERVER_ERROR).send();
};
