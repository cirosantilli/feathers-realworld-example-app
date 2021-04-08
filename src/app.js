const path = require('path');

const compress = require('compression');
const cors = require('cors');
const favicon = require('serve-favicon');
const helmet = require('helmet');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');

const appHooks = require('./app.hooks');
const authentication = require('./authentication');
const channels = require('./channels');
const logger = require('./logger');
const middleware = require('./middleware');
const services = require('./services');

const app = express(feathers());

// TODO this is possible on newer feathers.
//logger.info(app.get('MONGODB_FEATHERS_REALWORLD'));
//mongoose.connect(app.get('MONGODB_FEATHERS_REALWORLD'),{ useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true  });
logger.info(process.env.MONGODB_FEATHERS_REALWORLD);
mongoose.connect(process.env.MONGODB_FEATHERS_REALWORLD,{ useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true  });

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
