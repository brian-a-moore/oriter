import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { ApiResponse } from '../config/types';

export default async (event: APIGatewayProxyEvent, context: Context): Promise<ApiResponse> => {
  console.log('event', event);
  console.log('context', context);

  return {
    statusCode: 200,
    body: {},
  };
};
