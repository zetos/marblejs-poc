import { createServer } from '@marblejs/core';
import httpListener from './app';
require('dotenv').config();

const onListen = (): void =>
  console.info('[server] running', `@ http://localhost:${process.env.PORT!}/`);

const onClose = (): void => console.info(`[server] stopped`);

const onError = (error: Error): void =>
  console.error('[server] errored', error.message);

export const server = createServer({
  port: Number(process.env.PORT!),
  hostname: '127.0.0.1',
  httpListener
});

server
  .run()
  .listen(Number(process.env.PORT!), onListen)
  .on('close', onClose)
  .on('error', onError);
