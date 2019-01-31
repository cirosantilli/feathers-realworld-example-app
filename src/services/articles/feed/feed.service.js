// Initializes the `articles/feed` service on path `/articles/feed`
const createService = require('./feed.class.js');
const hooks = require('./feed.hooks');
const articleResponse = require('../../../middleware/article-response')

module.exports = function (app) {

  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/articles/feed', createService(options),articleResponse);

  // Get our initialized service so that we can register hooks
  const service = app.service('articles/feed');

  service.hooks(hooks);
  service.setup(app);
};
