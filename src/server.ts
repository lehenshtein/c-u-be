import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import { mainConfig } from './config/main-config';
import Logger from './library/logger';

const router = express();
// mongoose.connect(mainConfig.mongo.url, { retryWrites: true, w: 'majority' })
//   .then(() => {
//     Logger.log('connected to db');
//     StartServer();
//     if (config.env !== 'local') {
//       StartBot();
//     }
//   })
//   .catch((err) => {
//     Logger.err('Unable to connect');
//     Logger.err(err);
//   });

//:TODO Start server only if/after mongo connect
StartServer ();
function StartServer () {

  router.use((req, res, next) => {
    // Log the request
    Logger.info(`Incoming -> method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
      // Log the response
      Logger.info(`Incoming -> method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket
        .remoteAddress}] - Status: [${res.statusCode}]`);
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  // HealthCheck
  router.get('/ping', (req, res, next) => res.status(200).json({ message: 'c-u-be online' }));

  // Error handling
  router.use((req, res, next) => {
    const error = new Error('not found');
    Logger.err(error);

    return res.status(404).json({ message: error.message });
  });

  http.createServer(router).listen(mainConfig.server.port, () => Logger.info(`Server is running on port:
    http://localhost:${mainConfig.server.port}`));
}
