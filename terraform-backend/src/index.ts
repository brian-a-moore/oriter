import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import * as routes from './routes';
import schemaValidatorMiddleware from './config/validation';
import {
  addCustomerRequest,
  generateLinkRequest,
  loginRequest,
  registerRequest,
  submitRequest,
  verifyFormLinkRequest,
  verifyTokenRequest,
} from './config/validation/schemas/request';
import Joi from 'joi';
import { ApiResponse } from './config/types';

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<ApiResponse> => {
  if (event.body) {
    event.body = JSON.parse(event.body);
  }

  const route = `${event.httpMethod} ${event.path}`;

  console.log('REQUEST', { route, body: event.body });

  try {
    switch (route) {
      case 'POST /addCustomer':
        await schemaValidatorMiddleware(event, addCustomerRequest);
        return routes.addCustomer(event, context);
      case 'POST /generateLink':
        await schemaValidatorMiddleware(event, generateLinkRequest);
        return routes.generateLink(event, context);
      case 'POST /login':
        await schemaValidatorMiddleware(event, loginRequest);
        return routes.login(event, context);
      case 'POST /register':
        await schemaValidatorMiddleware(event, registerRequest);
        return routes.register(event);
      case 'POST /submit':
        await schemaValidatorMiddleware(event, submitRequest);
        return routes.submit(event, context);
      case 'POST /verifyFormLink':
        await schemaValidatorMiddleware(event, verifyFormLinkRequest);
        return routes.verifyFormLink(event, context);
      case 'POST /verifyToken':
        await schemaValidatorMiddleware(event, verifyTokenRequest);
        return routes.verifyToken(event, context);
      default:
        console.error('resource-not-found', route);

        return {
          statusCode: 404,
          body: {
            error: 'Not Found',
          },
        };
    }
  } catch (error: any | unknown) {
    if (error instanceof Joi.ValidationError) {
      return {
        statusCode: 400,
        body: {
          error: error.message,
        },
      };
    }

    console.error('server-error', error);

    return {
      statusCode: error.statusCode || 500,
      body: { error: error.message || 'Internal Server Error' },
    };
  }
};
