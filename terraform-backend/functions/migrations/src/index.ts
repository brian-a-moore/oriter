import { exec } from 'child_process';
import { Handler, Context, Callback } from 'aws-lambda';

const handler: Handler = (event: any, context: Context, callback: Callback) => {
  exec('npx prisma migrate deploy', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return callback(error);
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    callback(null, 'Migrations run successfully');
  });
};

export { handler };
