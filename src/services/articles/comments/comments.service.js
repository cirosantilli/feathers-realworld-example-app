// Initializes the `comments` service on path `/comments`
const createService = require('./comments.class.js');
const hooks = require('./comments.hooks');

module.exports = function (app) {

  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/articles/:slug/comments', createService(options));

  // A hook that updates `data` with the route parameter
  function mapSlugToData(context) {
    if(context.data && context.params.route.slug) {
      context.data.slug = context.params.route.slug;
    }
  }

  // For the new route, map the :slug route parameter to the query in a hook
  app.service('articles/:slug/comments').hooks({
    before: {
      find(context) {
        context.params.query.slug = context.params.route.slug;
      },
      create: mapSlugToData,
      remove: mapSlugToData
    }
  });

  // Get our initialized service so that we can register hooks
  const service = app.service('articles/:slug/comments');
  service.setup(app);

  service.hooks(hooks);
};
