import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import * as routes from './functions';

const handler = async (event: APIGatewayProxyEvent, context: Context) => {
  console.log('event', event);
  console.log('context', context);

  // Parse JSON body
  if (event.body) {
    event.body = JSON.parse(event.body);
  }

  try {
    switch (event.resource) {
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
        return { statusCode: 400, body: 'Invalid route' };
    }
  } catch (error: any | unknown) {
    // Handle errors
    console.error(error);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ message: error.message || 'Internal Server Error' }),
    };
  }
};

export const handlerMiddleware = handler;