import { APIGatewayEvent } from 'aws-lambda';
import { File, IncomingForm } from "formidable";
import { MasterForm } from "../config/types";

export const parseForm = async (event: APIGatewayEvent): Promise<{ fields: MasterForm, files: File[]}> => {
    return new Promise((resolve, reject) => {
        const form = new IncomingForm();
        let body;

        try {
            body = Buffer.from(event.body, 'base64').toString('binary');
        } catch (decodeError: any | unknown) {
            console.log('Could not decode base64 body', decodeError.message);
            body = event.body;
        };

        form.parse(body, async (err, { fields }, files) => {
            if(err) reject(err);
            else if(fields === undefined || !fields.length|| !files) {
                reject(new Error('No fields or files found'));
            } else {
                const filesArray = Object.values(files).map(file => file?.[0] as File);
                const parsedFields = JSON.parse(fields[0]) as MasterForm;
                
                console.log({ files: filesArray, fields: parsedFields });

                resolve({ fields: parsedFields, files: filesArray })
            }
        });
    });
}