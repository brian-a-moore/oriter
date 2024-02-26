import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import jsonBodyParser from '@middy/http-json-body-parser';
import * as routes from './functions';

const handler = async (event: APIGatewayProxyEvent, context: Context) => {
  console.log('event', event);
  console.log('context', context);
  
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
};

export const handlerMiddleware = middy(handler)
  .use(jsonBodyParser())
  .use(httpErrorHandler());