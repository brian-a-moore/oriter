import Joi, { ObjectSchema } from 'joi';
import { APIGatewayProxyEvent } from 'aws-lambda';

const schemaValidatorMiddleware = async (event: APIGatewayProxyEvent, schema: ObjectSchema) => {
  if (typeof event.body !== 'object') {
    throw new Joi.ValidationError(
      'Body undefined',
      [
        {
          message: 'Body undefined',
          path: ['body'],
          type: 'error',
        },
      ],
      [],
    );
  }

 await schema.validateAsync(event.body);
};

export default schemaValidatorMiddleware;
