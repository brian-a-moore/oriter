import { APIGatewayProxyEvent } from 'aws-lambda';
import { ApiResponse, LoginResponse } from '../config/types';

export default async (event: APIGatewayProxyEvent): Promise<ApiResponse<LoginResponse>> => {
  console.log('event', event);

  return {
    statusCode: 200,
    body: {
      data: {
        funeralHomeId: 'funeral-home-id',
        funeralHomeCode: 'funeral-home-code',
        funeralHomeName: 'funeral-home-name',
      },
    },
  };
};
