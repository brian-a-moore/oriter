import { NextFunction, Response } from 'express';
import { STATUS_CODE } from '../constants';
import { OriterRequest } from '../types';
import logger from '../utils/logger';

export default (err: any | unknown, req: OriterRequest, res: Response, next: NextFunction) => {
  if (!err) {
    logger.debug({
      message: 'ERROR_HANDLING_MIDDLEWARE: No error found - Continuing...',
      data: { routeId: req.routeId },
    });
    return next();
  }

  logger.error({
    message: 'ERROR_HANDLING_MIDDLEWARE: Error found',
    data: { routeId: req.routeId },
    error: err.message,
  });

  if (res.headersSent) {
    logger.debug({
      message: 'ERROR_HANDLING_MIDDLEWARE: Headers already sent - Continuing...',
      data: { routeId: req.routeId },
    });
    next();
  }

  logger.debug({
    message: `ERROR_HANDLING_MIDDLEWARE: Sending status: ${err.status || STATUS_CODE.SERVER_ERROR}`,
    data: { routeId: req.routeId },
  });

  res.status(err.status || STATUS_CODE.SERVER_ERROR).send();
};
