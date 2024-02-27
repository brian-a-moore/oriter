import { APIGatewayProxyEvent } from 'aws-lambda';
import { ApiResponse, LoginRequest, LoginResponse } from '../config/types';
import { responseHelper } from '../helpers/response';
import { FuneralHome } from '../config/db';
import { createToken } from '../config/jwt';

export default async (event: APIGatewayProxyEvent): Promise<ApiResponse> => {
  console.log('event', event);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { email } = event.body as LoginRequest;
  const funeralHomes = await FuneralHome.query('email').eq(email).exec();

  if (funeralHomes.count === 0) throw new Error('Account not found');

  const funeralHome = funeralHomes[0];
  const authToken = createToken({ funeralHomeId: funeralHome.PK });

  return responseHelper<LoginResponse>({
    statusCode: 200,
    data: {
      authToken,
      funeralHomeId: funeralHome.PK,
      funeralHomeName: funeralHome.funeralHomeName,
    },
  });
};
