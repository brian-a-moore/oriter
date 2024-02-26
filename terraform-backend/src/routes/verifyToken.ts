import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { ApiResponse, VerifyTokenResponse } from '../config/types';

export default async (event: APIGatewayProxyEvent, context: Context): Promise<ApiResponse<VerifyTokenResponse>> => {
  console.log('event', event);
  console.log('context', context);

  return {
    statusCode: 200,
    body: {
      data: {
        refreshToken: 'refresh-token',
        funeralHomeId: 'funeral-home-id',
        funeralHomeCode: 'funeral-home-code',
        funeralHomeName: 'funeral-home-name'
      }
    }
  };
};
