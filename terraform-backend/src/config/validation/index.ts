import Joi, { ObjectSchema } from 'joi';
import { APIGatewayProxyEvent } from 'aws-lambda';

const schemaValidatorMiddleware = async (event: APIGatewayProxyEvent, schema: ObjectSchema) => {
  if(!event.body) {
    throw new Joi.ValidationError('Body undefined', [{
      message: 'Body undefined',
      path: ['body'],
      type: 'error',
    }], []);
  }
  
  const { body } = await schema.validateAsync(event.body);

  event.body = body;

  return event;
};

export default schemaValidatorMiddleware;
