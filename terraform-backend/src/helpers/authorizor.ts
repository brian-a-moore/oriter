import { APIGatewayProxyEvent } from 'aws-lambda';
import { verifyToken } from '../config/jwt';
import { FuneralHome } from '../config/db';
import { responseHelper } from './response';

const authorizationErrorMessages = {
  authorizationNotProvided: 'Authorization not provided',
  unsupportedAuthType: 'Authentication type is not supported',
  accountDoesNotExist: 'Account does not exist',
};

export const authorizor = async (event: APIGatewayProxyEvent) => {
  try {
    const authorization = event.headers.authorization;
    if (!authorization) throw new Error(authorizationErrorMessages.authorizationNotProvided);
    const [type, data] = authorization.split(' ');

    if (type === 'Bearer') {
      const { funeralHomeId } = verifyToken(data);
      const funeralHome = await FuneralHome.get({ PK: funeralHomeId, SK: 'FUNERAL_HOME' });
      if (!funeralHome) throw new Error(authorizationErrorMessages.accountDoesNotExist);
      return;
    }

    throw new Error(authorizationErrorMessages.unsupportedAuthType);
  } catch (e: any | unknown) {
    console.error(e.message);
    responseHelper({ statusCode: 401, data: { error: `Not Authorized: ${e.message}` } });
  }
};
