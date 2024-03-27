import { Request } from 'express';
import { DecodedData } from '../utils/jwt';

export interface OriterRequest<ReqParams = unknown, ReqBody = unknown, ReqQuery = unknown>
  extends Request<ReqParams, unknown, ReqBody, ReqQuery> {
  routeId?: string;
  user?: DecodedData;
}
