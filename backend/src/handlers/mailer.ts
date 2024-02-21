import nodemailer from 'nodemailer';
import { MasterForm } from '../config/types';

const transporter = nodemailer.createTransport({
  SES: { region: 'us-east-1' },
});

export const sendEmail = async (fields: MasterForm, archivedImages: any): Promise<any> => {
    const mailOptions = {
        from: 'no-reply@oriter.com',
        to: 'ryan@oriter.com',
        subject: `NEW FORM SUBMISSION: ${fields.info.firstName} ${fields.info.lastName}`,
        text: JSON.stringify(fields),
        attachments: [
        {
            filename: 'images.zip',
            content: archivedImages,
            contentType: 'application/zip',
        },
        ]
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err;
        else console.log('Email sent successfully:', info);
    });
}