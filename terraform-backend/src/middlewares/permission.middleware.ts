import { NextFunction, Response, Request } from 'express';
import { STATUS_CODE } from '../constants';
import logger from '../utils/logger';

export default (req: Request, res: Response, next: NextFunction) => {
  if ((req.routeId?.includes('-admin') && req.user?.isAdmin) || !req.routeId?.includes('-admin')) {
    // Admin user cannot delete themselves
    if (
      req.routeId === `delete-admin-${req.params.adminId}` &&
      req.user?.isAdmin &&
      req.user.id === req.params.adminId
    ) {
      logger.error({
        message: 'PERMISSION MIDDLEWARE: No permission',
        error: 'Admin user attempted to delete themselves',
        data: { routeId: req.routeId, user: req.user! },
      });

      res.sendStatus(STATUS_CODE.NO_PERM);

      return;
    }

    // Admin user can only update themselves
    if (
      req.routeId === `patch-admin-${req.params.adminId}` &&
      req.user?.isAdmin &&
      req.user.id !== req.params.adminId
    ) {
      logger.error({
        message: 'PERMISSION MIDDLEWARE: No permission',
        error: 'Admin user attempted to update another admin',
        data: { routeId: req.routeId, user: req.user },
      });

      res.sendStatus(STATUS_CODE.NO_PERM);

      return;
    }

    logger.debug({
      message: 'PERMISSION MIDDLEWARE: Bypassed',
      data: { routeId: req.routeId, user: req.user },
    });
    next();
  } else {
    // Non-admin user attempted to access admin route
    logger.error({
      message: 'PERMISSION MIDDLEWARE: No permission',
      error: 'Non-admin user attempted to access admin route',
      data: { routeId: req.routeId, user: req.user },
    });

    res.sendStatus(STATUS_CODE.NO_PERM);
  }
};
