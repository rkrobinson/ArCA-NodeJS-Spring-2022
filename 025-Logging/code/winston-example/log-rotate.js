const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
require('winston-daily-rotate-file');

const level = 'silly';

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level,
  format: combine(
    label({ label: 'WINSTON' }),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      filename: 'winston-rotation-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

setInterval(() => {
  logger.silly('Silly level');
  logger.debug('Debug level');
  logger.verbose('Verbose level');
  logger.http('http level');
  logger.info('Info level');
  logger.warn('Warn level');
  logger.error('Error level');
}, 5000);
