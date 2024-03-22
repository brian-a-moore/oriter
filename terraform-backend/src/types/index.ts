import { Request } from 'express';

export interface OriterRequest<ReqParams = unknown, ReqBody = unknown, ReqQuery = unknown>
  extends Request<ReqParams, unknown, ReqBody, ReqQuery> {
  id?: string;
  isAdmin?: boolean;
}