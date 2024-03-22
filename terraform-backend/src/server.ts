import http from 'http';
import { app } from './app';
import { DEFAULT_PORT } from './constants';

const { PORT = DEFAULT_PORT } = process.env;

http.createServer(app).listen(PORT, () => {
  const { APP_ENV, PORT } = process.env;

  console.log({
    message: 'API SERVER - Online',
    port: PORT,
    environment: APP_ENV,
  });
});
