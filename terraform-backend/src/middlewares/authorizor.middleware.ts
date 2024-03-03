import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../config/jwt';
import { STATUS_CODE } from '../config/constants';

export default async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  const routeId = req.method.replace(/\//g, '-') + req.originalUrl.replace(/\//g, '-');

  try {
    if (routeId.includes('-auth')) {
      next();
    } else if (!authorization) {
      throw new Error('Not Authorized: Authorization not provided');
    } else {
      const [type, data] = authorization.split(' ');
      if (type === 'Bearer') {
        const decodedData = verifyToken(data);

        console.log({ decodedData });

        const count = 0;
        if (count > 0) {
          // req.userId = decodedData.userId;
          next();
        } else {
          throw new Error('Not Authorized: Account not found');
        }
      } else {
        throw new Error('Not Authorized: Authentication type is not supported');
      }
    }
  } catch (e: any | unknown) {
    console.error(e.message);
    res.sendStatus(STATUS_CODE.NO_AUTH);
    next(e);
  }
};
