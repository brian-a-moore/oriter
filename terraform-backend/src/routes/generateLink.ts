import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { ApiResponse, GenerateLinkResponse } from '../config/types';

export default async (event: APIGatewayProxyEvent, context: Context): Promise<ApiResponse<GenerateLinkResponse>> => {
  console.log('event', event);
  console.log('context', context);
  
  return {
    statusCode: 200,
    body: {
      data: {
        link: 'generated-link',
      }
    }
  };
};
