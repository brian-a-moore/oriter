import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import * as routes from './routes';
import schemaValidatorMiddleware from './middleware/schema-validator.middleware';
import { loginRequest, registerRequest, submitRequest, verifyFormLinkRequest, verifyTokenRequest } from './schemas/request';
import Joi from 'joi';

export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
  console.log('event', event);
  console.log('context', context);

  if (event.body) {
    event.body = JSON.parse(event.body);
  }

  const route = `${event.httpMethod} ${event.path}`;

  console.log('REQUEST', { route, body: event.body });

  try {
    switch (route) {
      case 'POST /login':
        event = await schemaValidatorMiddleware(event, loginRequest);
        return routes.login(event, context);
      case 'POST /register':
        event = await schemaValidatorMiddleware(event, registerRequest);
        return routes.register(event, context);
      case 'POST /submit':
        event = await schemaValidatorMiddleware(event, submitRequest);
        return routes.submit(event, context);
      case 'POST /verifyFormLink':
        event = await schemaValidatorMiddleware(event, verifyFormLinkRequest);
        return routes.verifyFormLink(event, context);
      case 'POST /verifyToken':
        event = await schemaValidatorMiddleware(event, verifyTokenRequest);
        return routes.verifyToken(event, context);
      default:
        return { statusCode: 404, body: JSON.stringify({ error: 'Resource not found' }) };
    }
  } catch (error: any | unknown) {
    if(error instanceof Joi.ValidationError) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: error.message })
      }
    }
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message || 'Internal Server Error' }),
    };
  }
};