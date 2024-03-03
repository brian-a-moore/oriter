import http from 'http';
import { app } from './app';
import { DEFAULT_PORT } from './config/constants';

const { PORT = DEFAULT_PORT } = process.env;

http.createServer(app).listen(PORT, () => {
  const { APP_ENV, PORT } = process.env;

  console.log(`API SERVER - Online [Port: ${PORT} | Environment: ${APP_ENV}]`);
});
