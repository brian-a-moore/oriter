import { APIGatewayProxyEvent, Context } from 'aws-lambda';

export default async (event: APIGatewayProxyEvent, context: Context) => {
  console.log('event', event);
  console.log('context', context);
  return { StatusCode: 200, Body: JSON.stringify({ message: '/VERIFY_TOKEN Success' }) };
};
