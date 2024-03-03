import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import { STATUS_CODE } from '../config/constants';

export default (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { query, body } = await schema.validateAsync({
        query: req.query,
        body: req.body,
      });

      req.query = query;
      req.body = body;

      next();
    } catch (e: any | unknown) {
      res.sendStatus(STATUS_CODE.BAD_INPUT);
      next(e);
    }
  };
};
