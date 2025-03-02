// logger.ts
import pino from 'pino';
import pinoPretty from 'pino-pretty';

// Criando um stream para o pino-pretty (log legível)
const prettyStream = pinoPretty({
  colorize: true, // Cores no terminal
  translateTime: 'SYS:standard', // Formato de data
});

// Criando o logger com o stream
const logger = pino(
  {
    level: 'info', // Nível de log
  },
  prettyStream // Passa o stream para o pino
);

export default logger;
