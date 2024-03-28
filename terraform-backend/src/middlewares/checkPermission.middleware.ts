import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE } from '../constants';
import logger from '../utils/logger';

export default (permissionChecks: ((req: Request) => Promise<string | false>)[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const promises = permissionChecks.map((check) => check(req));
    const results = await Promise.all(promises);
    const result = results.find((result) => result !== false);

    if (!result) {
      next();
    } else {
      logger.error({
        message: 'PERMISSION_MIDDLEWARE: No permission',
        error: result,
        data: {
          routeId: req.routeId,
          params: req.params,
          body: req.body,
        },
      });

      res.status(STATUS_CODE.NO_PERM).json({});
    }
  };
};
