import { APIGatewayProxyEvent } from 'aws-lambda';
import { AddCustomerResponse, ApiResponse } from '../config/types';
import { responseHelper } from '../helpers/response';

export default async (event: APIGatewayProxyEvent): Promise<ApiResponse> => {
  console.log('event', event);

  return responseHelper<AddCustomerResponse>({ statusCode: 200, data: { customerId: 'customer-id' }});
};
