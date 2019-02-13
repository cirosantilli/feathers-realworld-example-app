// Initializes the `tags` service on path `/tags`
const createService = require('feathers-mongoose');
const createModel = require('../../models/tags.model');
const hooks = require('./tags.hooks');
const tagResponse = require('../../middleware/tag-response');


module.exports = function (app) {
  const Model = createModel(app);

  const options = {
    Model,
    lean: true,
    paginate: {
      default: 20,
      max: 50
    }
  };

  // Initialize our service with any options it requires
  app.use('/tags', createService(options),tagResponse);

  // Get our initialized service so that we can register hooks
  const service = app.service('tags');

  service.hooks(hooks);
};
