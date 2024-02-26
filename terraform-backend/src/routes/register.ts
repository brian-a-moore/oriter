import { APIGatewayProxyEvent } from 'aws-lambda';
import { FuneralHome } from '../config/db';
import { RegisterRequest } from '../config/types/request';

export default async (event: APIGatewayProxyEvent) => {
  try {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const body = JSON.parse(event.body) as RegisterRequest;

    console.log('data: ',{ event, body })

    const funeralHomeCode = `${body.funeralHomeName.substring(0, 3).toUpperCase()}-${body.city.charAt(0)}${body.state}`;

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
