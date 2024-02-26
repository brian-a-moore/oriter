import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { ApiResponse, LoginResponse } from '../config/types';

export default async (event: APIGatewayProxyEvent, context: Context): Promise<ApiResponse<LoginResponse>> => {
  console.log('event', event);
  console.log('context', context);
  
  return {
    statusCode: 200,
    body: {
      data: {
        funeralHomeId: 'funeral-home-id',
        funeralHomeCode: 'funeral-home-code',
        funeralHomeName: 'funeral-home-name'
      }
    }
  };
};
