import http from 'http';
import { app } from './app';
import { DEFAULT_PORT } from './constants';
import logger from './utils/logger';

const { PORT = DEFAULT_PORT } = process.env;

http.createServer(app).listen(PORT, () => {
  const { APP_ENV, PORT } = process.env;

  logger.info({
    message: 'API SERVER - Online',
    data: {
      port: PORT,
      environment: APP_ENV,
    },
  });
});
