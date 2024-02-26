import { APIGatewayProxyEvent } from 'aws-lambda';
import { ApiResponse, GenerateLinkResponse } from '../config/types';

export default async (event: APIGatewayProxyEvent): Promise<ApiResponse<GenerateLinkResponse>> => {
  console.log('event', event);

  return {
    statusCode: 200,
    body: {
      data: {
        link: 'generated-link',
      },
    },
  };
};
