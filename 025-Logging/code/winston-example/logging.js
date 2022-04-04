const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

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
    new transports.File({ filename: 'winston-output.log' })
  ]
});

logger.silly('Silly level');
logger.debug('Debug level');
logger.verbose('Verbose level');
logger.http('http level');
logger.info('Info level');
logger.warn('Warn level');
logger.error('Error level');

/*
const DailyRotateFile = require('winston-daily-rotate-file');
logger.configure({
  level: 'verbose',
  transports: [
    new DailyRotateFile(opts)
  ]
});
*/