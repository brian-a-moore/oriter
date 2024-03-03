import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import routes from './routes';
import { ENV_TYPE } from './config/constants';

const { APP_ENV } = process.env;

const appEnv: ENV_TYPE = (APP_ENV as ENV_TYPE) || ENV_TYPE.LOCAL;

const morganMapper = new Map([
  [ENV_TYPE.LOCAL, 'tiny'],
  [ENV_TYPE.DEV, 'dev'],
  [ENV_TYPE.TEST, 'dev'],
  [ENV_TYPE.PROD, 'combined'],
]);

export const app = express();

app.use(cors());
app.use(morgan(morganMapper.get(appEnv) || 'tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

