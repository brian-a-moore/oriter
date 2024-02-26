import { APIGatewayProxyEvent } from 'aws-lambda';
import { ApiResponse, VerifyTokenResponse } from '../config/types';

export default async (event: APIGatewayProxyEvent): Promise<ApiResponse<VerifyTokenResponse>> => {
  console.log('event', event);

  return {
    statusCode: 200,
    body: {
      data: {
        refreshToken: 'refresh-token',
        funeralHomeId: 'funeral-home-id',
        funeralHomeCode: 'funeral-home-code',
        funeralHomeName: 'funeral-home-name',
      },
    },
  };
};
