import { APIGatewayProxyEvent } from 'aws-lambda';
import { FuneralHome } from '../config/db';
import crypto from 'crypto';
import { ApiResponse, FuneralHomeRecord, RegisterRequest, RegisterResponse } from '../config/types';
import { responseHelper } from '../helpers/response';

export default async (event: APIGatewayProxyEvent): Promise<ApiResponse> => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const body = event.body as RegisterRequest;

    const funeralHomeCode = `${body.funeralHomeName.substring(0, 3).toUpperCase()}-${body.city.charAt(0)}${body.state}`;

    const funeralHome = new FuneralHome({
      ...body,
      PK: crypto.randomUUID(),
      SK: 'FUNERAL_HOME',
      funeralHomeCode,
    } as FuneralHomeRecord);

    const res = await funeralHome.save() as unknown as FuneralHomeRecord;

  return responseHelper<RegisterResponse>({ statusCode: 200, data: {
    funeralHomeId: res.PK,
    funeralHomeCode,
    funeralHomeName: body.funeralHomeName,
  }});
  } catch (e: any | unknown) {
    console.error('error', e);

    return responseHelper({ data: { error: e.message }})
  }
};
