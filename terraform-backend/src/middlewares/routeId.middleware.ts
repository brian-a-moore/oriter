import { NextFunction, Response } from 'express';
import { OriterRequest } from '../types';

export default (req: OriterRequest, _: Response, next: NextFunction) => {
  req.routeId = req.method.replace(/\//g, '-') + req.originalUrl.replace(/\//g, '-');
  next();
};
