// Initializes the `articles` service on path `/articles`
const createService = require('feathers-mongoose');
const createModel = require('../../models/articles.model');
const hooks = require('./articles.hooks');
const articleResponse = require('../../middleware/article-response');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    lean: true,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/articles', createService(options),articleResponse);
  // re-export the feed service on the /articles/feed route
  app.use('/articles/feed', app.service('articles/feed'));

  // Get our initialized service so that we can register hooks
  const service = app.service('articles');

  service.hooks(hooks);
};
