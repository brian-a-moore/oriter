import { NextFunction, Response } from 'express';
import { STATUS_CODE } from '../constants';
import { OriterRequest } from '../types';

export default (err: any | unknown, req: OriterRequest, res: Response, next: NextFunction) => {
  if (!err) {
    console.debug('ERROR_HANDLING_MIDDLEWARE: No error found - Continuing...');
    return next();
  }

  console.error('ERRROR_HANDLING_MIDDLEWARE:', err.message);

  if (res.headersSent) {
    console.debug('ERROR_HANDLING_MIDDLEWARE: Headers already sent - Continuing...');
    next();
  }

  console.debug('ERROR_HANDLING_MIDDLEWARE: Sending status', err.status || STATUS_CODE.SERVER_ERROR);
  res.status(err.status || STATUS_CODE.SERVER_ERROR).send();
};
