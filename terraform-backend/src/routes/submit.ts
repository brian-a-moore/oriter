import { APIGatewayProxyEvent, Context } from 'aws-lambda';

export default async (event: APIGatewayProxyEvent, context: Context) => {
  console.log('event', event);
  console.log('context', context);
  return { statusCode: 200, body: JSON.stringify({ message: '/SUBMIT Success' }) };
};
