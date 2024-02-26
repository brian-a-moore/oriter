import { APIGatewayProxyEvent } from 'aws-lambda';
import { ApiResponse, LoginResponse } from '../config/types';
import { responseHelper } from '../helpers/response';

export default async (event: APIGatewayProxyEvent): Promise<ApiResponse> => {
  console.log('event', event);

  return responseHelper<LoginResponse>({ statusCode: 200, data: {
    funeralHomeId: 'funeral-home-id',
    funeralHomeName: 'funeral-home-name',
  }});
};
