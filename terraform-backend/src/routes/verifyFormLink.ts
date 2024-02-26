import { APIGatewayProxyEvent } from 'aws-lambda';
import { ApiResponse } from '../config/types';
import { responseHelper } from '../helpers/response';

export default async (event: APIGatewayProxyEvent): Promise<ApiResponse> => {
  console.log('event', event);

  return responseHelper<unknown>({ statusCode: 200, data: {}});
};
