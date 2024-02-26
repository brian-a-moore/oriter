import { APIGatewayProxyEvent } from 'aws-lambda';
import { FuneralHome } from '../config/db';
import { RegisterRequest } from '../config/types/request';

export default async (event: APIGatewayProxyEvent) => {
  try {
    const body = JSON.parse(event.body || '') as RegisterRequest;

    let funeralHomeCode; 

    try {
      funeralHomeCode = `${body.funeralHomeName.substring(0, 3).toUpperCase()}-${body.city.charAt(0)}${body.state}`;
    } catch (e: any | unknown) {
      console.error('code error', e.message);
    }

    const funeralHome = new FuneralHome({
      ...body,
      pk: crypto.randomUUID(),
      sk: 'FUNERAL_HOME',
      funeralHomeCode,
    });

    await funeralHome.save();

    return { statusCode: 200, body: JSON.stringify({ message: '/REGISTER Success' }) };
  } catch (e: any | unknown) {
    console.error(e);
    return { statusCode: 500, body: JSON.stringify({ error: '/REGISTER Error' }) };
  }
};
