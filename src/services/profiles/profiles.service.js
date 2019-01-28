// Initializes the `profiles` service on path `/profiles`
const createService = require('./profiles.class.js');
const hooks = require('./profiles.hooks');

module.exports = function (app) {

  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/profiles', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('profiles');
  service.setup(app.service('users'));

  service.hooks(hooks);
};
