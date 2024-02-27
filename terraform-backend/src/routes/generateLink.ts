import { APIGatewayProxyEvent } from 'aws-lambda';
import { ApiResponse, GenerateLinkResponse } from '../config/types';
import { responseHelper } from '../helpers/response';

export default async (event: APIGatewayProxyEvent): Promise<ApiResponse> => {
  console.log('event', event);

  return responseHelper<GenerateLinkResponse>({ statusCode: 200, data: { link: 'generated-link' } });
};
