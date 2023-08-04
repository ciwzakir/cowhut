import app from './app';
import mongoose from 'mongoose';
import config from './config/index';
import { erroLogger, infoLogger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  erroLogger.error(error);
  process.exit(1);
});
let server: Server;

async function funcdbconnect() {
  try {
    await mongoose.connect(config.database_url as string);
    infoLogger.info('Database Connected');

    server = app.listen(config.port, () => {
      infoLogger.info(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    erroLogger.error('Failed to Connect DB', err);
  }
  process.on('unhandledRejection', error => {
    erroLogger.error(error);
    if (server) {
      server.close(() => {
        erroLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

funcdbconnect();

process.on('SIGTERM', () => {
  erroLogger.error('Sigterm ');

  if (server) {
    server.close();
  }
});
// console.log(a)
