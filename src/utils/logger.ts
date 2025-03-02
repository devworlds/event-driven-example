import pino from 'pino';
import pinoPretty from 'pino-pretty';

const prettyStream = pinoPretty({
  colorize: true,
  translateTime: 'SYS:standard',
});

const lokiTransport = pino.transport({
  targets: [
    {
      target: 'pino-loki',
      options: {
        host: 'http://localhost:3100',
        labels: { app: 'my-app', env: 'development' },
        json: true,
      },
    },
    {
      target: 'pino-pretty',
      options: { colorize: true, translateTime: 'SYS:standard' },
    },
  ],
});

const logger = pino(
  {
    level: 'info',
  },
  lokiTransport 
);

export default logger;
