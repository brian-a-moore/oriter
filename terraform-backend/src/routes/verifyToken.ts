import { APIGatewayProxyEvent } from 'aws-lambda';
import { ApiResponse, VerifyTokenResponse } from '../config/types';
import { responseHelper } from '../helpers/response';

export default async (event: APIGatewayProxyEvent): Promise<ApiResponse> => {
  console.log('event', event);

  return responseHelper<VerifyTokenResponse>({ statusCode: 200, data: {
    refreshToken: 'refresh-token',
    funeralHomeId: 'funeral-home-id',
    funeralHomeName: 'funeral-home-name',
  }});
};
