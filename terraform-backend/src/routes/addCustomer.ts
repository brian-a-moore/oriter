import { APIGatewayProxyEvent } from 'aws-lambda';
import { AddCustomerResponse, ApiResponse } from '../config/types';

export default async (event: APIGatewayProxyEvent): Promise<ApiResponse<AddCustomerResponse>> => {
  console.log('event', event);

  return {
    statusCode: 200,
    body: {
      data: {
        customerId: 'customer-id',
      },
    },
  };
};
