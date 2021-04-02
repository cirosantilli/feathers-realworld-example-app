/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
const express = require('@feathersjs/express');

// REalWorld If services prefixed with api/ Then require app.setup(server)
const mainApp = express().use('/api', app);
const server = mainApp.listen(port);
app.setup(server);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);
