const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');
const authenticate = require('./hooks/authenticate');
const authenticateResponse = require('./hooks/authenticate-response');


module.exports = function (app) {
  const config = app.get('authentication');
  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local());
  app.service('users/login');
  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  // RealWorld use users/login
  app.service('users/login').hooks({
    before: {
      create: [
        authenticate(),
        authentication.hooks.authenticate(config.strategies),

      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    },
    after: {
      create: [
        authenticateResponse()
      ]
    }
  });

};
