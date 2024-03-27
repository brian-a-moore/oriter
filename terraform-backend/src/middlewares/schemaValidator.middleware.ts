import { NextFunction, Response, Request } from 'express';
import { ObjectSchema } from 'joi';
import { STATUS_CODE } from '../constants';
import logger from '../utils/logger';

export default (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { query, body } = await schema.validateAsync({
        query: req.query,
        body: req.body,
      });

      req.query = query;
      req.body = body;

      logger.debug({
        message: 'SCHEMA_VALIDATOR_MIDDLEWARE: Validation passed - Continuing...',
        data: { routeId: req.routeId },
      });

      next();
    } catch (e: any | unknown) {
      logger.error({
        message: 'SCHEMA_VALIDATOR_MIDDLEWARE: Validation failed',
        error: e.message,
        data: { routeId: req.routeId },
      });
      res.sendStatus(STATUS_CODE.BAD_INPUT);
    }
  };
};
