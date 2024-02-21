import * as archiver from 'archiver';
import * as fs from 'fs';
import { File } from 'formidable';

export const archiveImages = (files: File[]) => {
    const archive = archiver.default('zip', {
        zlib: { level: 9 }
    });

    const output = fs.createWriteStream('images.zip');

    archive.pipe(output);

    files.forEach(file => {
        archive.append(fs.createReadStream(file.filepath), { name: file.originalFilename });
    });

    archive.finalize();

    return archive.toString('base64');
}