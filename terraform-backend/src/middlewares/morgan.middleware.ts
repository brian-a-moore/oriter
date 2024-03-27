import { Response, Request } from 'express';
import logger from '../utils/logger';

export default (tokens: any, req: Request, res: Response) => {
  logger.debug({
    message: 'MORGAN_MIDDLEWARE: HTTP Request',
    data: {
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: tokens.status(req, res),
      responseTime: tokens['response-time'](req, res),
    },
  });
  return undefined;
};
