import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { AddCustomerResponse, ApiResponse } from '../config/types';

export default async (event: APIGatewayProxyEvent, context: Context): Promise<ApiResponse<AddCustomerResponse>> => {
  console.log('event', event);
  console.log('context', context);
  
  return {
    statusCode: 200,
    body: {
      data: {
        customerId: 'customer-id',
      }
    }
  };
};
