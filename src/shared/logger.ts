import { createLogger, format, transports } from 'winston';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, label, printf, prettyPrint } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const infoLogger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'right info!' }),
    timestamp(),
    myFormat,
    prettyPrint(),
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winton',
        'successes',
        'report-%DATE%-success.log',
      ),
      datePattern: 'DD-MMMM-YYYY',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

const erroLogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'Something Wrong!' }),
    timestamp(),
    myFormat,
    prettyPrint(),
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winton',
        'errors',
        'raisedOn-%DATE%-error.log',
      ),
      datePattern: 'DD-MMMM-YYYY',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});
export { infoLogger, erroLogger };
