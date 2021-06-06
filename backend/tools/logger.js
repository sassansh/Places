import pino from "pino"

const logger = pino({
  level: process.env.LOG_LEVEL || 'debug',
  prettyPrint: {
    colorize: true,
    ignore: 'pid,hostname',
    translateTime: 'SYS:mmmm d yyyy, h:MM:ss.l TT',
  },
});

logger.info(`Logging started using pino & pino-pretty`);
logger.info(`Timestamps are in local system's time zone`);

export default logger;