import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import * as routes from './functions';

export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
  console.log('event', event);
  console.log('context', context);

  // Parse JSON body
  if (event.body) {
    event.body = JSON.parse(event.body);
  }

  const HTTP_CALL = `${event.httpMethod} ${event.path}`;

  console.log('HTTP_CALL', HTTP_CALL)

  try {
    switch (HTTP_CALL) {
      case 'POST /login':
        return routes.login(event, context);
      case 'POST /register':
        return routes.register(event, context);
      case 'POST /submit':
        return routes.submit(event, context);
      case 'POST /verifyFormLink':
        return routes.verifyFormLink(event, context);
      case 'POST /verifyToken':
        return routes.verifyToken(event, context);
      default:
        return { statusCode: 400, body: JSON.stringify({ message: 'Resource not found' }) };
    }
  } catch (error: any | unknown) {
    console.error('error', error);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ message: error.message || 'Internal Server Error' }),
    };
  }
};