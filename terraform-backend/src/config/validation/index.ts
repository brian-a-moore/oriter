import { ObjectSchema } from 'joi';
import { APIGatewayProxyEvent } from 'aws-lambda';

const schemaValidatorMiddleware = async (event: APIGatewayProxyEvent, schema: ObjectSchema) => {
  const { body } = await schema.validateAsync(event.body);

  event.body = body;

  return event;
};

export default schemaValidatorMiddleware;
