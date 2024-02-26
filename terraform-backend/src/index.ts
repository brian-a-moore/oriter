import { APIGatewayProxyEvent } from 'aws-lambda';
import * as routes from './routes';
import validateSchema from './config/validation';
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

export const handler = async (event: APIGatewayProxyEvent): Promise<ApiResponse> => {
  if (event.body) {
    event.body = JSON.parse(event.body);
  }

  const route = `${event.httpMethod} ${event.path}`;

  console.log('REQUEST', { route, body: event.body });

  try {
    switch (route) {
      case 'POST /addCustomer':
        await validateSchema(event, addCustomerRequest);
        return routes.addCustomer(event);
      case 'POST /generateLink':
        await validateSchema(event, generateLinkRequest);
        return routes.generateLink(event);
      case 'POST /login':
        await validateSchema(event, loginRequest);
        return routes.login(event);
      case 'POST /register': 
        await validateSchema(event, registerRequest);
        return routes.register(event);
      case 'POST /submit':
        await validateSchema(event, submitRequest);
        return routes.submit(event);
      case 'POST /verifyFormLink':
        await validateSchema(event, verifyFormLinkRequest);
        return routes.verifyFormLink(event);
      case 'POST /verifyToken':
        await validateSchema(event, verifyTokenRequest);
        return routes.verifyToken(event);
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
      console.error('validation-error', error);
       
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
