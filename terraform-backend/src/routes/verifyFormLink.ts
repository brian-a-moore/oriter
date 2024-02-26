import { APIGatewayProxyEvent } from 'aws-lambda';
import { ApiResponse } from '../config/types';

export default async (event: APIGatewayProxyEvent): Promise<ApiResponse> => {
  console.log('event', event);

  return {
    statusCode: 200,
    body: {},
  };
};
