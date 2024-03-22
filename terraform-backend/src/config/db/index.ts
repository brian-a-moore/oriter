/* eslint-disable @typescript-eslint/ban-ts-comment */
// Prisma's types are wrong for the prisma.$on function
import { Prisma, PrismaClient } from '@prisma/client';
import { ENV_TYPE } from '../../constants';
import logger from '../../utils/logger';

const isJest = process.env.JEST_WORKER_ID !== undefined;
const appEnv = process.env.APP_ENV as ENV_TYPE;
const info = { emit: 'event', level: 'info' };
const warn = { emit: 'event', level: 'warn' };
const error = { emit: 'event', level: 'error' };

const logMap = new Map([
  [ENV_TYPE.LOCAL, [info, warn, error]],
  [ENV_TYPE.DEV, [info, warn, error]],
  [ENV_TYPE.TEST, [info, warn, error]],
  [ENV_TYPE.PROD, [warn, error]],
]) as unknown as Map<ENV_TYPE, Prisma.LogLevel[]>;

const prisma = new PrismaClient({
  log: isJest ? [] : logMap.get(appEnv),
});

// @ts-ignore
prisma.$on('query', (e: { timestamp: Date; message: string; target: string }) => {
  logger.debug({
    message: `PRISMA: ${e.message}`,
  });
});

// @ts-ignore
prisma.$on('info', (e: { timestamp: Date; message: string; target: string }) => {
  logger.info({
    message: `PRISMA: ${e.message}`,
  });
});

// @ts-ignore
prisma.$on('warn', (e: { timestamp: Date; message: string; target: string }) => {
  logger.warn({
    message: `PRISMA: ${e.message}`,
  });
});

// @ts-ignore
prisma.$on('error', (e: { timestamp: Date; message: string; target: string }) => {
  logger.error({
    message: `PRISMA: Error`,
    error: e.message,
  });
});

export default prisma;
