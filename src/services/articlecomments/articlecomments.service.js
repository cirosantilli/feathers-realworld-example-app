// Initializes the `articlecomments` service on path `/articlecomments`
const createService = require('feathers-nedb');
const createModel = require('../../models/articlecomments.model');
const hooks = require('./articlecomments.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/articlecomments', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('articlecomments');

  service.hooks(hooks);
};
