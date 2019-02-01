// Initializes the `follow` service on path `/follow`
const createService = require('./follow.class.js');
const hooks = require('./follow.hooks');

module.exports = function (app) {

  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/follow', createService(options));

  // re-export the posts service on the /users/:userId/posts route
  app.use('/profiles/:username/follow', app.service('follow'));

  // A hook that updates `data` with the route parameter
  function mapUserNameToData(context) {
    if(context.data && context.params.route.username) {
      context.data.username = context.params.route.username;
    }
  }

  // For the new route, map the `:userId` route parameter to the query in a hook
  app.service('profiles/:username/follow').hooks({
    before: {
      find(context) {
        context.params.query.username = context.params.route.username;
      },
      create: mapUserNameToData,
      remove: mapUserNameToData
    }
  });

  // Get our initialized service so that we can register hooks
  const service = app.service('follow');
  service.setup(app);

  service.hooks(hooks);
};
