import { NextFunction, Response } from 'express';
import { OriterRequest } from '../types';

export default (req: OriterRequest, _: Response, next: NextFunction) => {
  req.routeId = req.method.replace(/\//g, '-').toLowerCase() + req.originalUrl.replace(/[_/]/g, '-')
  next();
};
