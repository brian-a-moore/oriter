import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { ENV_TYPE } from './constants';
import authorizationMiddleware from './middlewares/authorization.middleware';
import errorHandlingMiddleware from './middlewares/errorHandling.middleware';
import permissionMiddleware from './middlewares/permission.middleware';
import routeIdMiddleware from './middlewares/routeId.middleware';
import routes from './routes';

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
app.use(routeIdMiddleware);
app.use(authorizationMiddleware);
app.use(permissionMiddleware);

app.use('/', routes);

app.use(errorHandlingMiddleware);
