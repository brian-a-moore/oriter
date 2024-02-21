import { APIGatewayEvent } from 'aws-lambda';
import { parseForm } from './form';
import { archiveImages } from './archiver';
import { sendEmail } from './mailer';

export const handler = async (event: APIGatewayEvent): Promise<any> => {
    try {
        const { files, fields } = await parseForm(event);
        const archivedImages = await archiveImages(files);
        await sendEmail(fields, archivedImages);
        return { statusCode: 200, body: JSON.stringify({ message: 'Success' }) };
    } catch(e: any | unknown) {
        console.error(e.message);
        return { statusCode: 500, body: JSON.stringify({ message: e.message }) };
    }
};
