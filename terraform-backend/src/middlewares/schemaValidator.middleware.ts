import { NextFunction, Response } from 'express';
import { ObjectSchema } from 'joi';
import { STATUS_CODE } from '../constants';
import { OriterRequest } from '../types';

export default (schema: ObjectSchema) => {
  return async (req: OriterRequest, res: Response, next: NextFunction) => {
    try {
      const { query, body } = await schema.validateAsync({
        query: req.query,
        body: req.body,
      });

      req.query = query;
      req.body = body;

      console.debug({
        routeId: req.routeId,
        message: 'SCHEMA_VALIDATOR_MIDDLEWARE: Validation passed - Continuing...',
      });

      next();
    } catch (e: any | unknown) {
      console.error({
        routeId: req.routeId,
        message: 'SCHEMA_VALIDATOR_MIDDLEWARE: Validation failed',
        error: e.message,
      });
      res.sendStatus(STATUS_CODE.BAD_INPUT);
    }
  };
};
